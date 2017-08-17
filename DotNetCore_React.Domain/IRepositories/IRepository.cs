
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;


namespace DotNetCore_React.Domain.IRepositories
{
    //接口定義
    public interface IRepository
    {

    }

    //定義泛型倉儲接口
    public interface IRepository<TEntity, TPrimaryKey> : IRepository where TEntity : Entity<TPrimaryKey>
    {
        void Delete(TEntity entity);
        void Delete(TPrimaryKey id);

        void DeleteRange(List<TEntity> idList);

        void DeleteRange(List<TPrimaryKey> idList);

        TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate);
        TEntity Get(TPrimaryKey id);
        List<TEntity> GetAllList();
        List<TEntity> GetAllList(Expression<Func<TEntity, bool>> predicate);
        TEntity Insert(TEntity entity);
        TEntity InsertOrUpdate(TEntity entity);
        int Save();
        TEntity Update(TEntity entity);

        List<TEntity> UpdateRange(List<TEntity> entityList);
    }

    //默認Guid主鍵類型倉儲
    public interface IRepository<TEntity> : IRepository<TEntity, Guid> where TEntity : Entity
    {

    }


    //默認Int主鍵類型倉儲
    public interface IRepository_Int<TEntity> : IRepository<TEntity, int> where TEntity : Entity_Int
    {
    }
}