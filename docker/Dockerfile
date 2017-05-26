FROM centos:6.6
MAINTAINER ogurasousui

# yum update
RUN yum -y update

# install appache
RUN yum -y install httpd

# supervisor
RUN yum install -y python-setuptools
RUN easy_install supervisor

# supervisor setting
ADD supervisord.conf /etc/supervisord.conf

# Expose ports.
EXPOSE 80

CMD ["/usr/bin/supervisord"]