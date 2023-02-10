package com.example.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Admin;
import com.example.demo.entities.Login;
import com.example.demo.repositry.AdminReprository;
import com.example.demo.repositry.LoginRepositry;



@Service
public class AdminService {
	@Autowired
	AdminReprository arepo;
	@Autowired
	LoginRepositry lrepo;
	
	public List<Admin> getAll()
	{
		return arepo.findAll();
	}	
	public boolean save(Admin c)
	{
		return arepo.save(c) != null;
	}
	public Admin getAdmin(int pid) 
	{
	 return arepo.findById(pid).get();
		
	}
	
	
	public Admin updateAdmin(Admin emp,int Admin_id)
	{
		Admin p=arepo.findById(Admin_id).get();
		p.setFirst_Name(emp.getFirst_Name());
		p.setLast_Name(emp.getLast_Name());
	
		p.setGender(emp.getGender());
		p.setLocation(emp.getLocation());
		p.setPhone(emp.getPhone());
		p.setJoin_Date(emp.getJoin_Date());
		p.setJob_Title(emp.getJob_Title());
		
		
		return arepo.save(p);
	}
	
	public Admin getAdmin(Login l)
	{
		return arepo.getAdmin(l);
	}
	


}

