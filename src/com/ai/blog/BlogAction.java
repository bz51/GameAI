package com.ai.blog;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;
import org.hibernate.HibernateException;
import org.hibernate.Session;

import com.ai.core.CoreDao;
import com.ai.core.HibernateSessionFactory;
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
	private String user_name;
	
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
	public String modifyBlog_old(){
		boolean result = CoreDao.updateByHql("update BlogEntity set content='"+content.replaceAll("~~~", "#")+"' where user_id="+user_id+" and type=0");
		System.out.println();
		if(!result){
			this.result = "no";
			this.reason = "Hibernate更新异常!";
		}
		return "modifyBlog";
	}
	
	
	/**
	 * 修改一篇博客_现用
	 * @return
	 */
	public String modifyBlog(){
		System.out.println("blog_id="+this.blog_id);
		//若blog_id为空，则说明修改简历
		if(blog_id==null || blog_id.equals("")){
			boolean result = true;
			
			//查询该user_id是否已有简历
			int size = CoreDao.queryListByHql("from BlogEntity where user_id="+user_id+" and type=0").size();
			
			//若已存在，则修改
			if(size==1){
				result = CoreDao.updateByHql("update BlogEntity set content='"+content.replaceAll("~~~", "#")+"' where user_id="+user_id+" and type=0");
			}
			
			//若不存在，则插入
			else{
				BlogEntity entity = new BlogEntity();
				entity.setContent(content.replaceAll("~~~", "#"));
				entity.setUser_id(Long.parseLong(user_id));
				entity.setDescription("个人简历");
				entity.setState(0);
				entity.setTitle(user_name+"的个人简历");
				entity.setName(user_name);
				int result2 = CoreDao.save(entity);
				if(result2==-1)
					result = false;
			}
			if(!result){
				this.result = "no";
				this.reason = "Hibernate更新异常!";
			}
			return "modifyBlog";
		}
		
		//若blog_id不为空，则说明修改博客内容
		else{

			boolean result = true;
			
			//若已存在，则修改
			result = CoreDao.updateByHql("update BlogEntity set content='"+content.replaceAll("~~~", "#")+"' where id="+blog_id);
			
			if(!result){
				this.result = "no";
				this.reason = "Hibernate更新异常!";
			}
			return "modifyBlog";
		
		}
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

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	
	
}
