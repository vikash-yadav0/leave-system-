package com.example.demo.entities;
import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="admin_table")
public class Admin {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	String Aid;
	@Column
	String First_Name;
	@Column
	String Last_Name;
	@Column
	String Phone;
	@Column
	String Email;
	@Column
	String Job_Title;
	
	@Column
	String Location;
	
	@Column
	Date Join_Date;
	@Column 
	String passward;
	@Column
	String Gender;
	
	
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="login")
	Login login;

	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	

	public Admin(String first_Name, String last_Name, String phone, String email, String job_Title, String location,
			Date join_Date, String passward, String gender,  Login login) {
		super();
		First_Name = first_Name;
		Last_Name = last_Name;
		Phone = phone;
		Email = email;
		Job_Title = job_Title;
		Location = location;
		Join_Date = join_Date;
		this.passward = passward;
		Gender = gender;
		
		this.login = login;
	}




	public Admin(String aid, String first_Name, String last_Name, String phone, String email, String job_Title,
			String location, Date join_Date, String passward, String gender,  Login login) {
		super();
		Aid = aid;
		First_Name = first_Name;
		Last_Name = last_Name;
		Phone = phone;
		Email = email;
		Job_Title = job_Title;
		Location = location;
		Join_Date = join_Date;
		this.passward = passward;
		Gender = gender;
	
		this.login = login;
	}




	public String getAid() {
		return Aid;
	}

	public void setAid(String aid) {
		Aid = aid;
	}

	public String getFirst_Name() {
		return First_Name;
	}

	public void setFirst_Name(String first_Name) {
		First_Name = first_Name;
	}

	public String getLast_Name() {
		return Last_Name;
	}

	public void setLast_Name(String last_Name) {
		Last_Name = last_Name;
	}

	public String getPhone() {
		return Phone;
	}

	public void setPhone(String phone) {
		Phone = phone;
	}

	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		Email = email;
	}

	public String getJob_Title() {
		return Job_Title;
	}

	public void setJob_Title(String job_Title) {
		Job_Title = job_Title;
	}

	




	public String getLocation() {
		return Location;
	}

	public void setLocation(String location) {
		Location = location;
	}

	

	public Date getJoin_Date() {
		return Join_Date;
	}

	public void setJoin_Date(Date join_Date) {
		Join_Date = join_Date;
	}

	public String getPassward() {
		return passward;
	}

	public void setPassward(String passward) {
		this.passward = passward;
	}

	public String getGender() {
		return Gender;
	}

	public void setGender(String gender) {
		Gender = gender;
	}

	public Login getLogin() {
		return login;
	}

	public void setLogin(Login login) {
		this.login = login;
	}
	
}

