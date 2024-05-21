using AutoMapper;
using DataAccess.DTOs.Request;
using DataAccess.Models;

namespace FPTIU_API.ProjectConnfig.Mapper
{
    public class MappingEntities : Profile
    {
        public MappingEntities()
        {
            CreateMap<AccountDTO,Account>().ReverseMap();           
        }
    }
}
