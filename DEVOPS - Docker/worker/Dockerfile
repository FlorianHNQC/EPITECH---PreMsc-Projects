FROM maven:3.5-jdk-8-alpine as builder
WORKDIR '/usr/src/app'
COPY . .
RUN mvn dependency:resolve && mvn package

FROM openjdk:8-jre-alpine
WORKDIR '/usr/app'
COPY --from=builder /usr/src/app/target/worker-jar-with-dependencies.jar .
CMD ["java", "-jar", "worker-jar-with-dependencies.jar"]