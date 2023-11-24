using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product,ProductToReturnDto>()
              .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
              .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
              .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(dest => dest.DeliveryMethod, opt => opt.MapFrom(src => src.DeliveryMethod.ShortName))
                .ForMember(dest => dest.ShippingPrice, opt => opt.MapFrom(src => src.DeliveryMethod.Price))
                .ForMember(dest => dest.OrderItems, opt => opt.MapFrom(src => src.OrderItems))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ForMember(dest => dest.Total, opt => opt.MapFrom(src => src.GetTotal()));
            CreateMap<OrderItem, OrderItemDto>()
                        .ForMember(d => d.Productid , o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                        .ForMember(d => d.ProductName , o => o.MapFrom(s => s.ItemOrdered.ProductName))
                        .ForMember(d => d.PictureUrl , o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
                        .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
        }
    }
}