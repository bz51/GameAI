package com.ai.core;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.PropertyAccessException;
import org.hibernate.Session;
import org.hibernate.cfg.Configuration;

import com.qq.connect.utils.json.JSONException;
import com.qq.connect.utils.json.JSONObject;

public class CoreDao {
	/**
	 * 保存一个实体对象
	 * @return 插入记录的id(id=-1表示插入失败)
	 */
	public static <T> int save(T obj){
		int id;
		try {
			Session session = HibernateSessionFactory.getSession();
			session.beginTransaction();
			id = (int) session.save(obj);
			session.getTransaction().commit();
		} catch (HibernateException e) {
			id = -1;
			e.printStackTrace();
		}finally{
			HibernateSessionFactory.closeSession();
		}
		return id;
	}

	/**
	 * 保存一系列实体对象
	 * @param list 含有需要保存的实体对象的集合
	 * @return result
	 */
	public static <T> boolean saveList(List<T> list){
		boolean result;
		try {
			Session session = HibernateSessionFactory.getSession();
			session.beginTransaction();
			for(T obj : list) {
				session.save(obj);
			}
			session.getTransaction().commit();
		} catch (HibernateException e) {
			result = false;
			e.printStackTrace();
		}finally{
			HibernateSessionFactory.closeSession();
		}
		return true;
	}

	/**
	 * 查询自定义集合，根据hql（用于多表查询）
	 * @return list 自定义元组的结果集(list=null说明出错)
	 */
	public static List<Object[]> queryCustomListByHql(String hql){
		if (hql==null || "".equals(hql)) {
			return null;
		}


		List<Object[]> list = new ArrayList<Object[]>();
		try {
			Session session = HibernateSessionFactory.getSession();
			session.beginTransaction();
			list =  session.createQuery(hql).list();
			session.getTransaction().commit();
		} catch (HibernateException e) {
			list = null;
			e.printStackTrace();
		}finally{
			HibernateSessionFactory.closeSession();
		}
		return list;
	}


	/**
	 * 查询实体集合，根据hql（用于单表查询）
	 * @return list 包含实体对象的结果集(list=null说明出错)
	 */
	public static <T> List<T> queryListByHql(String hql){
		if (hql==null || "".equals(hql)) {
			return null;
		}

		List<T> list = new ArrayList<T>();
//		try {
			Session session = HibernateSessionFactory.getSession();
			session.beginTransaction();
			list = session.createQuery(hql).list();
			session.getTransaction().commit();
//		} catch (HibernateException e) {
//			list = null;
//			e.printStackTrace();
//		}finally{
			HibernateSessionFactory.closeSession();
//		}
		return list;
	}


	/**
	 * 查询一条记录，根据id
	 * @param entityName 实体类的名字
	 * @return obj 查询的结果实体对象(obj=null表示出错)
	 */
	public static <T> T queryUniqueById(long id,String entityName){
		if(id<=0 || entityName==null || "".equals(entityName)){
			return null;
		}

		T entity;
		try {
			Session session = HibernateSessionFactory.getSession();
			session.beginTransaction();
			String hql = "from "+entityName+" where id=:idString";
			entity = (T) session.createQuery(hql)
				.setInteger("idString", (int)id)
				.uniqueResult();
			session.getTransaction().commit();
		} catch (PropertyAccessException e) {
			//id一般为long，但BSB中id都是int，所以当传入的id为long时就抛出PropertyAccessException异常，此时是恤将id改为int即可
			Session session = HibernateSessionFactory.getSession();
			session.beginTransaction();
			String hql = "from "+entityName+" where id=:idString";
			entity = (T) session.createQuery(hql)
				.setLong("idString", id)
			.uniqueResult();
			session.getTransaction().commit();
		} catch (HibernateException e) {
			entity = null;
			e.printStackTrace();
		}finally{
			HibernateSessionFactory.closeSession();
		}
		return entity;
	}
	public static <T> T queryUniqueById_old(long id,String entityName){
		if(id<=0 || entityName==null || "".equals(entityName)){
			return null;
		}
		
		T entity;
		Session session = null;
//		try {
//			Session session = HibernateSessionFactory.getSession();
			session = HibernateTool.getSessionFactory().openSession();
			session.beginTransaction();
			String hql = "from "+entityName+" where id=:idString";
			entity = (T) session.createQuery(hql)
					.setInteger("idString", (int)id)
					.uniqueResult();
			session.getTransaction().commit();
//		} catch (PropertyAccessException e) {
//			//id一般为long，但BSB中id都是int，所以当传入的id为long时就抛出PropertyAccessException异常，此时是恤将id改为int即可
//			session = HibernateTool.getSessionFactory().openSession();
//			session.beginTransaction();
//			String hql = "from "+entityName+" where id=:idString";
//			entity = (T) session.createQuery(hql)
//					.setLong("idString", id)
//					.uniqueResult();
//			session.getTransaction().commit();
////		} catch (HibernateException e) {
//			entity = null;
//			e.printStackTrace();
//			session.getTransaction().rollback();
//		}finally{
			session.close();
//		}
		return entity;
	}


	/**
	 * 删除一条记录，根据id
	 * @param entityName 实体类的名字
	 * @param id 需要删除的记录的id
	 */
	public static <T> boolean deleteUniqueById(long id,String entityName){
		if(id<=0 || entityName==null || "".equals(entityName)){
			return false;
		}

		boolean result = true;
		try {
			Session session = HibernateSessionFactory.getSession();
			session.beginTransaction();
			String hql = "update "+entityName+" set state=0 where id=:idString";
			session.createQuery(hql)
				.setLong("idString", id)
				.executeUpdate();
			session.getTransaction().commit();
		} catch (HibernateException e) {
			result = false;
			e.printStackTrace();
		}finally{
			HibernateSessionFactory.closeSession();
		}
		return result;
	}
	
	
	/**
	 * 删除一条记录，根据id(真的删掉)
	 * @param entityName 实体类的名字
	 * @param id 需要删除的记录的id
	 */
	public static <T> boolean deleteUniqueById_realDelete(long id,String entityName){
		if(id<=0 || entityName==null || "".equals(entityName)){
			return false;
		}
		
		boolean result = true;
		try {
			Session session = HibernateSessionFactory.getSession();
			session.beginTransaction();
			String hql = "delete from "+entityName+" where id=:idString";
			session.createQuery(hql)
			.setLong("idString", id)
			.executeUpdate();
			session.getTransaction().commit();
		} catch (HibernateException e) {
			result = false;
			e.printStackTrace();
		}finally{
			HibernateSessionFactory.closeSession();
		}
		return result;
	}


	/**
	 * 修改记录，根据hql
	 * @param hql 
	 * @return result
	 */
	public static boolean updateByHql(String hql){
		if (hql==null || "".equals(hql)) {
			return false;
		}

		boolean result = true;
		try {
			Session session = HibernateSessionFactory.getSession();
			session.beginTransaction();
			session.createQuery(hql)
				.executeUpdate();
			session.getTransaction().commit();
		} catch (HibernateException e) {
			result = false;
			e.printStackTrace();
		}finally{
			HibernateSessionFactory.closeSession();
		}
		return result;
	}
	
	
}
