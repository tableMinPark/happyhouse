package com.happyhouse.api.follow.dto;

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
public class FollowResultDto {
	private int pageIdFollowing;
	private int pageIdFollower;
	private int userIdFollowing;
	private int userIdFollower;
}
