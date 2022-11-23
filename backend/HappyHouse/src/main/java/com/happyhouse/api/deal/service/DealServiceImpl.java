package com.happyhouse.api.deal.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.happyhouse.api.deal.dao.DealDao;
import com.happyhouse.api.deal.dto.DealChartDto;
import com.happyhouse.api.deal.dto.DealDto;
import com.happyhouse.api.deal.dto.DealParamDto;
import com.happyhouse.api.deal.dto.DealResultDto;
import com.happyhouse.api.deal.dto.FileDto;
import com.happyhouse.api.deal.dto.HouseDto;
import com.happyhouse.api.review.dto.ReviewResultDto;

@Service
public class DealServiceImpl implements DealService{
	
	@Autowired
	DealDao dao;
	
	@Value("${app.fileupload.dealDir}")
	String uploadFolder;
	
	@Value("${app.fileupload.path}")
	String uploadPath;
		
	@Override
	@Transactional
	public int dealInsert(DealDto dealDto, HouseDto houseDto, MultipartHttpServletRequest request) {
		
		int ret = 1;
		
		try {
			//houseId 먼저 생성
			dao.houseInsert(houseDto);// useGeneratedKeys="true" keyProperty="houseId"
			System.out.println(houseDto);
			
			dealDto.setHouseId(houseDto.getHouseId());
			dao.dealInsert(dealDto);  // useGeneratedKeys="true" keyProperty="dealId"
			
			List<MultipartFile> fileList = request.getFiles("file");
	
			File uploadDir = new File(uploadPath + File.separator + uploadFolder);
			if (!uploadDir.exists()) uploadDir.mkdir();

			for (MultipartFile part : fileList) {

				int dealId = dealDto.getDealId();
				
				String fileName = part.getOriginalFilename();
				
				//Random File Id
				UUID uuid = UUID.randomUUID();
				
				//file extension
				String extension = FilenameUtils.getExtension(fileName); // vs FilenameUtils.getBaseName()
			
				String savingFileName = uuid + "." + extension;
			
				File destFile = new File(uploadPath + File.separator + uploadFolder + File.separator + savingFileName);
				
				System.out.println(uploadPath + File.separator + uploadFolder + File.separator + savingFileName);
				part.transferTo(destFile);
		    
			    // Table Insert
			    FileDto fileDto = new FileDto();
			    fileDto.setDealId(dealId);
			    fileDto.setFileName(fileName);
			    fileDto.setFileSize(part.getSize());
			    fileDto.setFileContentType(part.getContentType());
				String boardFileUrl = uploadFolder + "/" + savingFileName;
				fileDto.setFileUrl(boardFileUrl);
				
				dao.fileInsert(fileDto);
			}
			
		}catch(IOException e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
			ret = 0;
		}
		return ret;
	}
	
	@Override
	@Transactional
	public int dealUpdate(int DealId,DealDto dealDto, HouseDto houseDto, MultipartHttpServletRequest request) {
		
		int ret = 1;
		
		try {
			
			
			houseDto.setHouseId(dealDto.getHouseId());
			dealDto.setDealId(DealId);
			System.out.println(houseDto);
			System.out.println(dealDto);
			dao.houseUpdate(houseDto);
			
			
			dao.dealUpdate(dealDto);
			
			
			//업로드 폴더 지정
			File uploadDir = new File(uploadPath + File.separator + uploadFolder);
			if (!uploadDir.exists()) uploadDir.mkdir();
			
			//삭제할 파일 목록
			List<String> deleteFileList = dao.getDeleteFileList(dealDto.getDealId());
			
			//폴더 내 파일 삭제
			for(String fileUrl : deleteFileList) {
				File file = new File(uploadPath + File.separator, fileUrl);
				if(file.exists()) {
					file.delete();
				}
			}
			
			
			//db 삭제
			dao.deleteFile(dealDto.getDealId());
			
			List<MultipartFile> fileList = request.getFiles("file");
	
			
			//파일 업로드
			for (MultipartFile part : fileList) {

				int dealId = dealDto.getDealId();
				
				String fileName = part.getOriginalFilename();
				
				//Random File Id
				UUID uuid = UUID.randomUUID();
				
				//file extension
				String extension = FilenameUtils.getExtension(fileName); // vs FilenameUtils.getBaseName()
			
				String savingFileName = uuid + "." + extension;
			
				File destFile = new File(uploadPath + File.separator + uploadFolder + File.separator + savingFileName);
				
				System.out.println(uploadPath + File.separator + uploadFolder + File.separator + savingFileName);
				part.transferTo(destFile);
		    
			    // Table Insert
			    FileDto fileDto = new FileDto();
			    fileDto.setDealId(dealId);
			    fileDto.setFileName(fileName);
			    fileDto.setFileSize(part.getSize());
			    fileDto.setFileContentType(part.getContentType());
				String boardFileUrl = uploadFolder + "/" + savingFileName;
				fileDto.setFileUrl(boardFileUrl);
				
				dao.fileInsert(fileDto);
			}
			
		}catch(IOException e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
			ret = 0;
		}
		return ret;
	}
	
	@Override
	public int dealDelete(int dealId) {
		
		//업로드 폴더 지정
		File uploadDir = new File(uploadPath + File.separator + uploadFolder);
		if (!uploadDir.exists()) uploadDir.mkdir();
		
		//삭제할 파일 목록
		List<String> deleteFileList = dao.getDeleteFileList(dealId);
		
		//폴더 내 파일 삭제
		for(String fileUrl : deleteFileList) {
			File file = new File(uploadPath + File.separator, fileUrl);
			if(file.exists()) {
				file.delete();
			}
		}
		
		
		//db 삭제
		dao.deleteFile(dealId);
		
		
		
		return dao.dealDelete(dealId);
	}

	@Override
	public DealResultDto houseList(String searchWord) {
		DealResultDto ret = null;
		try {
			ret = new DealResultDto();
			List<HouseDto> res = dao.houseList(searchWord);
			ret.setHouseList(res);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return ret;
	}

	@Override
	public DealResultDto dealList(DealParamDto dto) {
		DealResultDto ret = null;
		try {
			ret = new DealResultDto();
			List<DealParamDto> res = dao.dealList(dto);
			ret.setJoinList(res);
			ret.setCount(dao.dealListCount(dto));
		}catch(Exception e) {
			e.printStackTrace();
		}
		return ret;
	}

	@Override
	public List<String> imgList(int dealId) {
		return dao.imgList(dealId);
	}

	@Override
	public DealDto dealDetail(int dealId) {
		
		return dao.dealDetail(dealId);
	}

	@Override
	public HouseDto houseDetail(int dealId) {
		
		return dao.houseDetail(dealId);
	}

	@Override
	public List<HouseDto> searchByAddress(String dongCode) {
		return dao.searchByAddress(dongCode);
	}

	@Override
	public List<HouseDto> searchByKeyword(String keyword) {
		return dao.searchByKeyword(keyword);
	}

	@Override
	public List<DealDto> getOldDealList(int houseId) {
		return dao.getOldDealList(houseId);
	}

	@Override
	public List<DealDto> getNowDealList(int houseId) {
		return dao.getNowDealList(houseId);
	}

	@Override
	public List<ReviewResultDto> getReviewList(int houseId) {
		return dao.getReviewList(houseId);
	}

	@Override
	public DealResultDto getMyList(DealParamDto dealParamDto) {
		DealResultDto ret = new DealResultDto();
		List<DealParamDto> res = dao.getMyList(dealParamDto);
		ret.setJoinList(res);
		// TODO Auto-generated method stub
		return ret;
	}
	
	
	
	@Override
    public List<DealChartDto> getChartList(DealDto dealDto) {
        return dao.getChartList(dealDto);
    }

	
    

}
