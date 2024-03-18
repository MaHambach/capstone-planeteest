FROM --platform=linux/amd64 openjdk:21
EXPOSE 8080
ADD backend/target/plane-teest.jar plane-teest.jar
ENTRYPOINT ["java", "-jar", "plane-teest.jar"]