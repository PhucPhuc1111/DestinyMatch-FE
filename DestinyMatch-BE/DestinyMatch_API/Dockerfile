#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["FPTIU-BE/FPTIU_API.csproj", "FPTIU-BE/"]
COPY ["FPTIU_DataAccess/FPTIU_DataAccess.csproj", "FPTIU_DataAccess/"]
COPY ["FPTIU_Domain/FPTIU_Domain.csproj", "FPTIU_Domain/"]
RUN dotnet restore "./FPTIU-BE/FPTIU_API.csproj"
COPY . .
WORKDIR "/src/FPTIU-BE"
RUN dotnet build "./FPTIU_API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./FPTIU_API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FPTIU_API.dll"]