package com.ai.core;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.FilterConfig;
import javax.servlet.ServletException;

import org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter;
import org.apache.struts2.interceptor.ApplicationAware;

import com.ai.blog.BlogAction;
import com.qq.connect.utils.json.JSONException;
import com.qq.connect.utils.json.JSONObject;

/**
 * 本类用于Tomcat启动时各种初始化操作
 * @author chibozhou
 */
public class InitFilterDispatcher extends StrutsPrepareAndExecuteFilter implements ApplicationAware{
	private Map<String,Object> application;
	
	@Override
	/**
	 * Tomcat启动时各种初始化操作在此进行
	 */
    public void init(FilterConfig arg0) throws ServletException {    
        super.init(arg0);    
        
        System.out.println("InitFilterDispatcher已执行……");
        
        //定时线程1:每隔1.5时获取一次blogList
        getBlogList(5400000);
        
    }    
	
	
	
	/**
	 * 定时线程：获取access_token
	 */
	private boolean getBlogList(long time){
		if(time<=0)
			return false;
		
		Timer timer = new Timer();
        TimerTask task =new TimerTask(){
            public void run(){
            	CoreDao.queryUniqueById(5, "UserEntity");
            }
        };
        timer.scheduleAtFixedRate(task, new Date(),time);//当前时间开始起动 每次间隔n秒再启动
		return true;
	}
	
	
	
	@Override
	public void destroy() {
		super.destroy();
		System.out.println("detroy……");
		
	}


	

	@Override
	public void setApplication(Map<String, Object> application) {
		this.application = application;
	}
	
	public Map<String, Object> getApplication() {
		return application;
	}
}
