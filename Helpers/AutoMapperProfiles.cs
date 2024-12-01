using API.DTOs;
using API.Entites;
using API.Extentions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {

        public AutoMapperProfiles()
        {
            CreateMap<AppUser,MemberDto>()
                .ForMember(dest=>dest.PhotoUrl, opt=> opt.MapFrom(src=> src.Photos.FirstOrDefault(w=>w.IsMain).Url))
                .ForMember(x=>x.Age, opt=> opt.MapFrom(src=> src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
        }
    }
}
