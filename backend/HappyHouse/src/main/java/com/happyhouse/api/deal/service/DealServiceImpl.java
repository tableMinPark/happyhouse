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
import com.happyhouse.api.deal.dto.CityDto;
import com.happyhouse.api.deal.dto.DealParamDto;
import com.happyhouse.api.deal.dto.DealResultDto;
import com.happyhouse.api.deal.dto.FileDto;
import com.happyhouse.api.deal.dto.HouseDto;

@Service
public class DealServiceImpl implements DealService{
	
	@Autowired
	DealDao dao;
	
	@Value("${app.fileupload.dealDir}")
	String uploadFolder;
	
	@Value("${app.fileupload.path}")
	String uploadPath;
	
	@Override
	public List<CityDto> cityList(int code) {
		return dao.cityList(code);
	}
	
	@Override
	@Transactional
	public DealResultDto dealInsert(DealParamDto dto, MultipartHttpServletRequest request) {
		
		DealResultDto boardResultDto = new DealResultDto();
		
		try {
			//houseId 먼저 생성
			dao.houseInsert(dto);// useGeneratedKeys="true" keyProperty="houseId"
			dao.dealInsert(dto); // useGeneratedKeys="true" keyProperty="dealId"

			
			List<MultipartFile> fileList = request.getFiles("file");
	
			File uploadDir = new File(uploadPath + File.separator + uploadFolder);
			if (!uploadDir.exists()) uploadDir.mkdir();

			for (MultipartFile part : fileList) {

				int dealId = dto.getDealId();
				
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

			boardResultDto.setResult(1);
			
		}catch(IOException e) {
			e.printStackTrace();
			boardResultDto.setResult(0);
		}
		return boardResultDto;
	}

	@Override
	public DealResultDto houseList(String searchWord) {
		DealResultDto ret = new DealResultDto();
		try {
			List<HouseDto> res = dao.houseList(searchWord);
			ret.setHouseList(res);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return ret;
	}

	@Override
	public DealResultDto dealList(DealParamDto dto) {
		DealResultDto ret = new DealResultDto();
		List<DealParamDto> res = dao.dealList(dto);
		ret.setJoinList(res);
		ret.setCount(dao.dealListCount(dto));
		return ret;
	}

}
