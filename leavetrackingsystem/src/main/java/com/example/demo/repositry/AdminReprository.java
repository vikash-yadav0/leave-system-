package com.example.demo.repositry;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Admin;
import com.example.demo.entities.Login;

@Repository
public interface AdminReprository extends JpaRepository<Admin, Integer>{

	@Query("select l  from Admin l where login.login_id=:uid")
	public Optional<Admin> loginid(int uid);

	@Query("select d from Admin d where login=:l")
	public Admin getAdmin(Login l);

}

