package com.ai.blog;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.ai.core.CoreDao;
import com.opensymphony.xwork2.ActionSupport;

public class BlogAction extends ActionSupport implements SessionAware{
	private String content;
	private String title;
	private int type;
	private int state;
	private String description;
	private Map session;
	private String result = "yes";
	private String reason;
	private List<BlogEntity> blogList;
	private BlogEntity blogEntity;
	private String blog_id;
	private String user_id;
	
	/**
	 * 发布一篇博客
	 */
	public String postBlog(){
		BlogEntity entity = new BlogEntity();
		entity.setContent(content.replaceAll("~~~", "#"));
		entity.setName(session.get("name")+"");
		entity.setTime(new Timestamp(new Date().getTime()));
		entity.setUser_id(Integer.parseInt(user_id));
		entity.setDescription(description);
		entity.setTitle(title);
		entity.setType(type);
		entity.setState(state);
		System.out.println(content.replaceAll("~~~", "#"));
		CoreDao.save(entity);
		return "postBlog";
	}
	
	/**
	 * 获取博文 
	 */
	public String getBlog(){
		if(this.blog_id==null || "".equals(this.blog_id))
			this.blogList = CoreDao.queryListByHql("from BlogEntity");
		else
			this.blogList = CoreDao.queryListByHql("from BlogEntity where id="+this.blog_id);
		
		if(this.blogList == null){
			this.result = "no";
			this.reason = "Hibernate查询出错！";
			return "getBlog";
		}
		
		return "getBlog";
	}
	
	/**
	 * 获取博文 
	 */
	public String getBlogById(){
		this.blogEntity = (BlogEntity) CoreDao.queryListByHql("from BlogEntity where id="+this.blog_id).get(0);
		
		return "getBlogById";
	}
	
	
	/**
	 * 根据user_id获取个人简历
	 */
	public String getResume(){
		List<BlogEntity> list = CoreDao.queryListByHql("from BlogEntity where user_id="+this.user_id+" and type=0");
		if(list==null){
			this.result = "no";
			this.reason = "Hibernate查询错误";
			return "getResume";
		}
		
		System.out.println("size="+list.size());
		this.blogEntity = list.get(0);
		return "getResume";
	}
	
	
	
	/**
	 * 删除博文
	 */
	public String deleteBlog(){
		boolean result = CoreDao.deleteUniqueById_realDelete(Long.parseLong(this.blog_id), "BlogEntity");
		if(!result){
			this.result = "no";
			this.reason = "Hibernate删除异常！";
		}
		return "deleteBlog";
	}

	
	
	
	/**
	 * 修改一篇博客
	 */
	public String modifyBlog(){
		boolean result = CoreDao.updateByHql("update BlogEntity set content='"+content.replaceAll("~~~", "#")+"' where user_id="+user_id+" and type=0");
		System.out.println();
		if(!result){
			this.result = "no";
			this.reason = "Hibernate更新异常!";
		}
		return "modifyBlog";
	}
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Map getSession() {
		return session;
	}

	public void setSession(Map session) {
		this.session = session;
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


	public List<BlogEntity> getBlogList() {
		return blogList;
	}

	public void setBlogList(List<BlogEntity> blogList) {
		this.blogList = blogList;
	}

	public String getBlog_id() {
		return blog_id;
	}

	public void setBlog_id(String blog_id) {
		this.blog_id = blog_id;
	}

	public BlogEntity getBlogEntity() {
		return blogEntity;
	}

	public void setBlogEntity(BlogEntity blogEntity) {
		this.blogEntity = blogEntity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	
	
}
