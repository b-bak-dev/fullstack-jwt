package com.bartlomiejbak.mappers;

import com.bartlomiejbak.dtos.SignUpDto;
import com.bartlomiejbak.dtos.UserDto;
import com.bartlomiejbak.entites.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}
