package com.ai.user;

import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.ai.core.CoreDao;
import com.opensymphony.xwork2.ActionSupport;

public class UserAction extends ActionSupport implements SessionAware{
	private String username;
	private String password;
	private UserEntity userEntity;
	private List<UserEntity> userList;
	private String user_id;
	private String result = "yes";
	private String reason;
	private Map session;
	
	/**
	 * 登录
	 */
	public String login(){
		if(username==null || "".equals(username) || password==null || "".equals(password)){
			this.result = "no";
			this.reason = "username、password不能为空";
			return "login";
		}
		
		//查询结果
		List<UserEntity> list = CoreDao.queryListByHql("from UserEntity where username='"+this.username+"' and password='"+this.password+"'");
		//登录失败
		if(list==null || list.size()<=0){
			System.out.println("list="+list);
			this.result = "no";
			this.reason = "用户名或密码错误";
			return "login";
		}
		
		//登录成功
		this.userEntity = list.get(0);
		System.out.println("name:"+userEntity.getName());
		session.put("id", userEntity.getId());
		session.put("name", userEntity.getName());
		return "login";
	}
	
	
	/**
	 * 查询所有用户信息
	 */
	public String getAllUsers(){
		//查询
		this.userList = CoreDao.queryListByHql("from UserEntity");
		
		//查询失败
		if(this.userList==null){
			this.result = "no";
			this.reason = "Hibernate查询异常！";
			return "getAllUsers";
		}
		
		//查询成功
		return "getAllUsers";
	}
	
	
	/**
	 * 新增一个用户
	 */
	public String addUser(){
		//保存新用户
		int id = CoreDao.save(this.userEntity);
		
		//保存失败
		if(id==-1){
			this.result = "no";
			this.reason = "新用户增加失败！";
			return "addUser";
		}
		
		//保存成功
		return "addUser";
	}
	
	
	/**
	 * 根据id获取用户信息
	 */
	public String getUserInfoById(){
		this.userEntity = CoreDao.queryUniqueById(Long.parseLong(this.user_id), "UserEntity");
		
		if(this.userEntity == null){
			this.result = "no";
			this.reason = "Hibernate查询异常";
			return "getUserInfoById";
		}
		
		return "getUserInfoById";
	}
	
	
	/**
	 * 修改某一用户的信息
	 */
	public String modifyUser(){
		if(userEntity.getId()<=0){
			this.result = "no";
			this.reason = "user_id不能为空！";
			return "modifyUser";
		}
		
		boolean result = CoreDao.updateByHql("update UserEntity set username='"+userEntity.getUsername()+"' , password='"+userEntity.getPassword()+"' , name='"+userEntity.getName()+"' , age="+userEntity.getAge()+" , mail='"+userEntity.getMail()+"' , phone='"+userEntity.getPhone()+"' , role="+userEntity.getRole()+" , resume='"+userEntity.getResume()+"' where id="+userEntity.getId());
		
		if(!result){
			this.result = "no";
			this.reason = "Hibernate更新异常！";
			return "modifyUser";
		}
		
		return "modifyUser";
	}
	
	
	/**
	 * 删除一个用户 
	 */
	public String deleteUser(){
		boolean result = CoreDao.deleteUniqueById_realDelete(Long.parseLong(this.user_id), "UserEntity");
		if(!result){
			this.result = "no";
			this.reason = "Hibernate删除异常！";
			return "deleteUser";
		}
		
		
		return "deleteUser";
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public UserEntity getUserEntity() {
		return userEntity;
	}

	public void setUserEntity(UserEntity userEntity) {
		this.userEntity = userEntity;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public List<UserEntity> getUserList() {
		return userList;
	}

	public void setUserList(List<UserEntity> userList) {
		this.userList = userList;
	}


	public String getUser_id() {
		return user_id;
	}


	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
    public void setSession(Map session) {
        this.session = session;
     }
	
	
}
