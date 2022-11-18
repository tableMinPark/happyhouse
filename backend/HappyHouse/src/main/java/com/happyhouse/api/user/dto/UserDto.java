package com.happyhouse.api.user.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDto {
	private int userId;
	private String userEmail;
	private String userPassword;
	private String userName;
	private String userAddress;
	private String userTel;
	private String userProfileImageUrl;
	private LocalDateTime userRegDt;
	private String code;
	private String token;
	private boolean auth;
	private String auth_code;
}
