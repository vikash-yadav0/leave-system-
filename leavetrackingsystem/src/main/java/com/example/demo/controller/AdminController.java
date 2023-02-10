package com.example.demo.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Admin;
import com.example.demo.entities.Department;
import com.example.demo.entities.Login;
import com.example.demo.entities.Register;
import com.example.demo.service.AdminService;
import com.example.demo.service.DepartmentService;
import com.example.demo.service.LoginService;



@CrossOrigin(origins ="*")
@RestController
public class AdminController {
	@Autowired
	AdminService aservice;
	
	@Autowired
	DepartmentService dservice;
	
	@Autowired
	LoginService lservice;
	
	@PostMapping("/registereadmin")
	public boolean registerAdmin(@RequestBody Register pr)
	{
		boolean flag =true;
		
		try
		{
			
			Login l=new Login( pr.getEmail(),pr.getPassword(),"admin");
			Login inserted=lservice.add(l);
			Admin p=new Admin(pr.getFirst_name(),pr.getLast_name(),pr.getPhone(),pr.getEmail(),pr.getJob_title(),pr.getLocation(),pr.getJoin_date(),pr.getPassword(),pr.getGender(),inserted);
			aservice.save(p);
			
			
		}
		catch (Exception e)
		{
			System.out.println("exception occur");
			flag=false;
		}
		
		return flag;
		
		
	}	
	
	@GetMapping("/alladmin")
	public List<Admin> getAll()
	{
		return aservice.getAll();
		
	}
	@PostMapping("/saveadmin")
	public boolean SaveAdmin(@RequestBody Admin C)
	{
		return aservice.save(C);
	}
	@GetMapping("/getadmin")
	public Admin getAdmin(@RequestParam("Admin_id") int eid)
	{
		return aservice.getAdmin(eid);
	}
	
	
	@PostMapping("/updateAdmin")
	public Admin updateAdmin (@RequestBody Admin emp,@RequestParam("Admin_id") int pid)
	{
		return aservice.updateAdmin(emp, pid);
		
	}
	
	@PostMapping("/getAdmin")
	public Admin getAdmin(@RequestBody Login l)
	{
		return aservice.getAdmin(l);
	}
	@GetMapping("/getAdminbylogin")
	public Admin getAdminbylogin(@RequestParam("login_id") int lid)
	{
		Login l=lservice.find(lid);
		return aservice.getAdmin(l);
	}
}

