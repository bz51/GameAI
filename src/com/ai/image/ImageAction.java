package com.ai.image;

import java.io.File;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.ai.core.CoreDao;
import com.ai.core.Parameter;
import com.ai.core.UploadTools;
import com.opensymphony.xwork2.ActionSupport;

public class ImageAction extends ActionSupport implements SessionAware{
	private String result = "yes";
	private String reason;
	private File[] files; //上传的文件
    private String[] filesFileName; //文件名称
    private String[] filesContentType; //文件类型
    private String user_id;
    private String username;
    private List<ImageEntity> imageList;
    private Map session;
	
    /**
     * 上传图片 
     */
    public String uploadImage(){
    	//上传图片
    	for(File file : files){
    		String pic = Parameter.UploadPath_rela+UploadTools.upload(file);
    		//将图片路径存入DB
    		ImageEntity entity = new ImageEntity();
    		entity.setName(pic);
    		entity.setTime(new Timestamp(new Date().getTime()));
    		entity.setUser_id(session.get("id")+"");
    		entity.setUser_name(session.get("name")+"");
    		CoreDao.save(entity);
    	}
    	return "uploadImage";
    }
    
    
    /**
     * 获取所有图片信息 
     */
    public String getAllImages(){
    	this.imageList = CoreDao.queryListByHql("from ImageEntity");
    	
    	if(this.imageList == null){
    		this.result = "no";
    		this.reason = "Hibernate查询异常！";
    		return "getAllImages";
    	}
    	
    	return "getAllImages";
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

	public File[] getFiles() {
		return files;
	}

	public void setFiles(File[] files) {
		this.files = files;
	}

	public String[] getFilesFileName() {
		return filesFileName;
	}

	public void setFilesFileName(String[] filesFileName) {
		this.filesFileName = filesFileName;
	}

	public String[] getFilesContentType() {
		return filesContentType;
	}

	public void setFilesContentType(String[] filesContentType) {
		this.filesContentType = filesContentType;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<ImageEntity> getImageList() {
		return imageList;
	}

	public void setImageList(List<ImageEntity> imageList) {
		this.imageList = imageList;
	}


	public Map getSession() {
		return session;
	}


	public void setSession(Map session) {
		this.session = session;
	}
	
	
}
