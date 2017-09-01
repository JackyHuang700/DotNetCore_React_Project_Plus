
using System;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Linq;
using System.Collections.Generic;
using System.Reflection;

namespace DotNetCore_React.EntityFrameworkCore
{

    /// <summary>
    /// 基礎類型
    /// </summary>
    public abstract class DotNetCore_ReactRepositoryBase<TEntity, TPrimaryKey> : IRepository<TEntity, TPrimaryKey> where TEntity : Entity<TPrimaryKey>
    {
        //定義數據庫訪問上下對象
        protected readonly DotNetCore_ReactDBContext _dbContext;

        public DotNetCore_ReactRepositoryBase(DotNetCore_ReactDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        /// <summary>
        /// 獲取實體集合
        /// </summary>
        /// <returns></returns>
        public List<TEntity> GetAllList()
        {
            return _dbContext.Set<TEntity>().Where(createBaseFilter()).ToList();
        }

        /// <summary>
        /// 根據lambda表達式條件獲取實體集合
        /// </summary>
        /// <param name="predicate">lambda表達式條件</param>
        /// <returns></returns>
        public List<TEntity> GetAllList(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbContext.Set<TEntity>().Where(createBaseFilter()).Where(predicate).ToList();
        }

        /// <summary>
        /// 根據主鍵獲取實體
        /// </summary>
        /// <param name="id">實體主鍵</param>
        /// <returns></returns>
        public TEntity Get(TPrimaryKey id)
        {
            return _dbContext.Set<TEntity>().Where(createBaseFilter()).FirstOrDefault(CreateEqualityExpressionForId(id));
        }

        /// <summary>
        /// 根據lambda表達式條件獲取單個實體
        /// </summary>
        /// <param name="predicate">lambda表達式條件</param>
        /// <returns></returns>
        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbContext.Set<TEntity>().Where(createBaseFilter()).FirstOrDefault(predicate);
        }

        /// <summary>
        /// 新增實體
        /// </summary>
        /// <param name="entity">實體</param>
        /// <returns></returns>
        public TEntity Insert(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
            return entity;
        }

        /// <summary>
        /// 更新實體
        /// </summary>
        /// <param name="entity">實體</param>
        public TEntity Update(TEntity entity)
        {
            _dbContext.Set<TEntity>().Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
            return entity;
        }

        public List<TEntity> UpdateRange(List<TEntity> entityList)
        {
            foreach (var entity in entityList)
            {
                _dbContext.Set<TEntity>().Attach(entity);
                _dbContext.Entry(entity).State = EntityState.Modified;
            }
            return entityList;
        }


        /// <summary>
        /// 新增或更新實體
        /// </summary>
        /// <param name="entity">實體</param>
        public TEntity InsertOrUpdate(TEntity entity)
        {
            if (Get(entity.Id) != null)
                return Update(entity);
            return Insert(entity);
        }

        /// <summary>
        /// 刪除實體
        /// </summary>
        /// <param name="entity">要刪除的實體</param>
        public void Delete(TEntity entity)
        {
            //軟刪除
            var mapper = TrySetProperty(entity, "Status", -1);
            if (mapper)
            {
                _dbContext.Set<TEntity>().Update(entity);
            }
            //若無法軟刪除，實行真刪除
            else
            {
                _dbContext.Set<TEntity>().Remove(entity);
            }
        }

        private bool TrySetProperty(object obj, string property, object value)
        {
            var prop = obj.GetType().GetProperty(property, BindingFlags.Public | BindingFlags.Instance);
            if (prop != null && prop.CanWrite)
            {
                prop.SetValue(obj, value, null);
                return true;
            }
            return false;
        }

        /// <summary>
        /// 刪除實體
        /// </summary>
        /// <param name="id">實體主鍵</param>
        public void Delete(TPrimaryKey id)
        {
            var getData = Get(id);
            if (getData != null)
            {
                Delete(getData);
            }      
        }

        /// <summary>
        /// 刪除實體
        /// </summary>
        /// <param name="id">實體主鍵</param>
        public void DeleteRange(List<TPrimaryKey> id)
        {
            foreach (var i in id)
            {
                Delete(i);
            }
        }


        /// <summary>
        /// 刪除實體
        /// </summary>
        /// <param name="id">實體主鍵</param>
        public void DeleteRange(List<TEntity> id)
        {
            foreach (var i in id)
            {
                Delete(i);
            }
        }

        /// <summary>
        /// 事務性保存
        /// </summary>
        public int Save()
        {
            return _dbContext.SaveChanges();
        }

        /// <summary>
        /// 根據主鍵構建判斷表達式
        /// </summary>
        /// <param name="id">主鍵</param>
        /// <returns></returns>
        protected static Expression<Func<TEntity, bool>> CreateEqualityExpressionForId(TPrimaryKey id)
        {
            var lambdaParam = Expression.Parameter(typeof(TEntity));
            var lambdaBody = Expression.Equal(
                Expression.PropertyOrField(lambdaParam, "Id"),
                Expression.Constant(id, typeof(TPrimaryKey))
                );

            return Expression.Lambda<Func<TEntity, bool>>(lambdaBody, lambdaParam);
        }

        protected static Expression<Func<TEntity, bool>> createBaseFilter()
        {
            var checkParams = typeof(TEntity).GetProperty("Status");
            if (checkParams == null) { return o => true; }
            var lambdaParam = Expression.Parameter(typeof(TEntity));  
            var lambdaBody = 
                    Expression.GreaterThan(
                        Expression.PropertyOrField(lambdaParam, "Status"),
                        Expression.Constant(-1,typeof(int))
                        );

            return Expression.Lambda<Func<TEntity, bool>>(lambdaBody, lambdaParam);
        }
    }

    public abstract class DotNetCore_ReactRepositoryBase<TEntity> : DotNetCore_ReactRepositoryBase<TEntity, Guid> where TEntity : Entity
    {
        public DotNetCore_ReactRepositoryBase(DotNetCore_ReactDBContext dbContext) : base(dbContext)
        { }
    }


    public abstract class DotNetCore_ReactRepositoryBase_Int<TEntity> : DotNetCore_ReactRepositoryBase<TEntity, int> where TEntity : Entity_Int
    {
        public DotNetCore_ReactRepositoryBase_Int(DotNetCore_ReactDBContext dbContext) : base(dbContext)
        {

        }


    }

}