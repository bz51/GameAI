package com.ai.core;

import org.hibernate.HibernateException;
import org.hibernate.Session;


/**
 * 实现对数据库操作的模板类，具体的操作定义在函数
 * @author chibozhou
 */
public abstract class HibernateTemplate {
	protected boolean result = true;
	protected String reason;
	
	/**
	 * 将具体的操作封装在一个事务里
	 */
	public boolean hibernateOperation(){

		try {
			Session session = HibernateSessionFactory.getSession();
			session.beginTransaction();
		
			session = handle(session);
		
			session.getTransaction().commit();
		} catch (HibernateException e) {
			System.out.println("error1:"+e.getMessage());
			result = false;
			reason = "Hibernate异常";
			e.printStackTrace();
			System.out.println("error2:"+e.getMessage());
		}finally{
			HibernateSessionFactory.closeSession();
		}
		System.out.println("HIbernateTemplate:"+result);
		System.out.println("reason="+reason);
		return result;
	}
	
	/**
	 * 具体的操作
	 */
	protected abstract Session handle(Session session);

	public boolean getResult() {
		return result;
	}

	public String getReason() {
		return reason;
	}

	
	
}