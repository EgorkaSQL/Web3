
FROM bitnami/wildfly:latest

COPY ./target/Web3Lab.war /opt/bitnami/wildfly/standalone/deployments/ROOT.war
COPY driver/postgresql-42.7.4.jar /opt/bitnami/wildfly/standalone/deployments/
COPY postgres-ds.xml /opt/bitnami/wildfly/standalone/deployments/

EXPOSE 8080

CMD ["/opt/bitnami/wildfly/bin/standalone.sh", "-b", "0.0.0.0"]