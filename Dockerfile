FROM --platform=linux/amd64 openjdk:21
EXPOSE 8080
ADD backend/target/PlaneTeest.jar PlaneTeest.jar
ENTRYPOINT ["java", "-jar", "app.jar"]