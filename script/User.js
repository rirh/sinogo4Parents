var user = new Object();
//数据库存储
var db;
//数据库名称
var dbname = 'student';
//建表语句
var StudentTable = 'CREATE TABLE Student(id   int AUTO_INCREMENT, Icon varchar(255), Name varchar(255), Sex varchar(255), Birthday varchar(255), School varchar(255), Hobby varchar(255),PRIMARY KEY (`id`))';

//单例创建数据库
var isfirst = false;
//学生数据插入
var i = 0;

function getUser() {
	var headpic = $api.getStorage('headpic');
	var name = $api.getStorage('name');
	var sex = $api.getStorage('sex');
	var birthday = $api.getStorage('birthday');
	var hobby = $api.getStorage('hobby');
	var hobbyid = $api.getStorage('hobbyid');
	var school = $api.getStorage('school');
	user.headpic = headpic;
	user.name = name;
	user.sex = sex;
	user.birthday = birthday;
	user.hobby = hobby;
	user.hobbyid = hobbyid;
	user.school = school;
	return user;
}

function setUser(key, value) {
	var name = $api.setStorage(key, value);
	user.key = name;
	return user;
}

function formateCacheUser() {

	user.headpic = null;
	user.name = null;
	user.sex = null;
	user.birthday = null;
	user.hobby = null;
	user.school = null;
	user = null;

}

//初始化打开数据库
function opendb() {
	if (isfirst) {
		alert('数据库已经打开')
	} else {
		db = api.require('db');
		db.openDatabase({
			name : dbname
		}, function(ret, err) {
			if (ret.status) {
				alert(JSON.stringify(ret) + '打开数据库成功');

			} else {
				alert(JSON.stringify(err));
			}
		});

		db.executeSql({
			name : dbname,
			sql : StudentTable
		}, function(ret, err) {
			if (ret.status) {
				alert(JSON.stringify(ret) + '-----' + '建表成功');
			} else {
				alert(JSON.stringify(err) + '错误');
			}
		});

		isfirst = true;
	}

}

//添加学生数据
function insert(headpic, name, sex, birthday, school, hobby) {
	i++;
	//创建完成的学生端语句
	var add = "INSERT INTO　Student (Id_S,Icon,Name,Sex,Birthday,School,Hobby) VALUES (" + i + "," + headpic + "," + name + "," + sex + "," + birthday + "," + school + "," + hobby + ")";
	//      var add = "INSERT INTO　Student VALUES ('"+i+"'+'"+ headpic + "','"+ name + "','"+ sex + "','"+ birthday + "','"+ school + "','"+ hobby+"')";
	console.log('Userlog------' + i + '头像地址' + headpic + '用户名' + name + '性别' + sex + '生日' + birthday + '学校' + school + '爱好' + hobby);
	db.executeSql({
		name : dbname,
		sql : add
	}, function(ret, err) {
		if (ret.status) {
			alert(JSON.stringify(ret) + '-----' + '建表成功');
		} else {
			console.log(JSON.stringify(err) + '错误');
			alert(JSON.stringify(err));

		}
	});
}

