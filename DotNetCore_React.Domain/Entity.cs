using System;


namespace DotNetCore_React.Domain
{

    public abstract class Entity<TPrimaryKey>
    {
        public virtual TPrimaryKey Id { get; set; }
    }

    public abstract class Entity: Entity<Guid>
    {
        
    }


    public abstract class Entity_Int : Entity<int>
    {

    }
}