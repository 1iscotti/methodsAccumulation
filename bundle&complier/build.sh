###
 # @Author: your name
 # @Date: 2020-08-17 17:29:53
 # @LastEditTime: 2020-08-17 17:31:03
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: /methodsAccumulation/打包编译相关/build.sh
### 
#!/bin/bash
#这一行的作用是什么呢？

#作用是指定当前脚本使用什么解释器来执行，也就是说使用哪一种Shell来执行。

#说白了，系统会自动将shell文件名和传递的参数，作为参数，传递给#!后面的shell去执行。

# 附加参数检查(jenkins打包规则附加参数)
ERR_MSG_MISS_BUILD_EXTERNAL_PARAMS="错误：缺少 build_external_params 参数\n\n
- test 测试环境\n
- uat uat环境\n
- online 线上环境\n
"
if [[ "$1" =~ ^(test|uat|online)$ ]]; then
  export PROJECT_ENV=$1
  env | grep PROJECT_ENV
else
  echo -e $ERR_MSG_MISS_BUILD_EXTERNAL_PARAMS
  exit 1
fi
# 设置为prod模式
export NODE_ENV=production
env | grep NODE_ENV #该命令显示包含‘NODE_ENV’关键字的环境变量
# env 打印当前环境变量；
# grep 过滤命令，遇到NODE_ENV显示该行；
# 管道| 讲打印的东西传给后面的命令处理


mkdir -p ./output/webroot
#m kdir [-p] dirname 在工作目录下output（-p表示若无则创建一个）创建一个web root子目录
cp -r ./dist/static ./output/webroot
# 将./dist/static下所有文件复制到./output/webroot

chmod -R 755 ./output/webroot
# 所以，chmod 755 设置用户的权限为：

#1.文件所有者可读可写可执行

#2.与文件所有者同属一个用户组的其他用户可读可执行

#3.其它用户组可读可执行
# $# 是启动脚本时携带的参数个数
# -ne 是不等于
# 这个语句的意思是“如果shell的启动参数不等于1个”
# $# 表示提供到shell脚本或者函数的参数总数；
# $1 表示第一个参数。

#  -ne 表示 不等于

# 另外：
# 整数比较
# -eq     等于,如:if ["$a" -eq "$b" ]
# -ne     不等于,如:if ["$a" -ne "$b" ]
# -gt     大于,如:if ["$a" -gt "$b" ]
# -ge    大于等于,如:if ["$a" -ge "$b" ]
# -lt      小于,如:if ["$a" -lt "$b" ]
# -le      小于等于,如:if ["$a" -le "$b" ]
# <  小于(需要双括号),如:(("$a" < "$b"))
# <=  小于等于(需要双括号),如:(("$a" <= "$b"))
# >  大于(需要双括号),如:(("$a" > "$b"))
# >=  大于等于(需要双括号),如:(("$a" >= "$b"))

# 另外：$?是shell变量,表示"最后一次执行命令"的退出状态.0为成功,非0为失败.
