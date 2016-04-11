package com.ai.comment;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.ai.core.CoreDao;
import com.opensymphony.xwork2.ActionSupport;

public class CommentAction extends ActionSupport{
	private String result = "yes";
	private String reason;
	private List<CommentEntity> commentList = new ArrayList<CommentEntity>();
	private CommentEntity commentEntity;
	private String blog_id;
	
	/**
	 * 获取某一篇博客的所有评论
	 */
	public String getCommentsByBlogId(){
		//健壮性判断：若blog_id非法
		if(blog_id==null || "".equals(blog_id)){
			this.result = "no";
			this.reason = "blog_id不能为空，且必须为正整数！";
			return "getCommentsByBlogId";
		}
		
		//查询该博客的所有评论
		commentList = CoreDao.queryListByHql("from CommentEntity where blog_id="+this.blog_id);
		if(commentList==null){
			this.result = "no";
			this.reason = "查询出错！";
			return "getCommentsByBlogId";
		}
		
		return "getCommentsByBlogId";
	}
	
	
	
	/**
	 * 发布一条评论 
	 */
	public String postComment(){
		//健壮性判断
		if(commentEntity==null || commentEntity.getBlog_id()<=0 || commentEntity.getContent()==null ||
				commentEntity.getName()==null){
			this.result = "no";
			this.reason = "commentEntity缺少参数！";
			return "postComment";
		}
		
		//若comment_id不为空
		System.out.println("comment_id="+commentEntity.getComment_id());
		if(commentEntity.getComment_id()>0){
			//查询该评论的name
			CommentEntity entity = (CommentEntity)CoreDao.queryUniqueById((long)commentEntity.getComment_id(), "CommentEntity");
			String name = entity.getName();
			commentEntity.setComment_name(name);
		}
		
		//发布评论
		commentEntity.setTime(new Timestamp(new Date().getTime()));
		CoreDao.save(commentEntity);
		return "postComment";
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

	public List<CommentEntity> getCommentList() {
		return commentList;
	}

	public void setCommentList(List<CommentEntity> commentList) {
		this.commentList = commentList;
	}

	public CommentEntity getCommentEntity() {
		return commentEntity;
	}

	public void setCommentEntity(CommentEntity commentEntity) {
		this.commentEntity = commentEntity;
	}

	public String getBlog_id() {
		return blog_id;
	}

	public void setBlog_id(String blog_id) {
		this.blog_id = blog_id;
	}

	
	
}
