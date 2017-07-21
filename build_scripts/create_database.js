

var mysql = require('mysql');
var dbconfig = require('../config/database.js');

var connection = mysql.createConnection(dbconfig.connection);

//db creation
connection.query('CREATE DATABASE ' + dbconfig.database);

//table structures
connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` (\
  `ID` int(11) NOT NULL,\
  `USERNAME` varchar(50) COLLATE utf8_bin NOT NULL,\
  `PASSWORD` varchar(200) COLLATE utf8_bin NOT NULL,\
  `EMAIL` varchar(50) COLLATE utf8_bin NOT NULL,\
  `ROL` int(12) NOT NULL\
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;\
 ');
connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.message_table + '` (\
  `ID` int(11) NOT NULL,\
  `TICKET_ID` int(11) NOT NULL,\
  `USER_ID` int(11) NOT NULL,\
  `MESSAGE` varchar(2000) COLLATE utf8_bin NOT NULL,\
  `TIMESTAMP` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP\
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;\
 ');
connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.ticket_table + '` (\
  `ID` int(11) NOT NULL,\
  `USER_ID` int(11) NOT NULL,\
  `INQUIRY` varchar(2000) COLLATE utf8_bin NOT NULL,\
  `STATUS` varchar(20) COLLATE utf8_bin NOT NULL,\
  `TIMESTAMP` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP\
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;\
 ');

//Indexes
connection.query('\
ALTER TABLE `' + dbconfig.database + '`.`' + dbconfig.message_table + '`\
  ADD PRIMARY KEY (`ID`),\
  ADD KEY `TICKET_ID` (`TICKET_ID`),\
  ADD KEY `USER_ID` (`USER_ID`);\
 ');
connection.query('\
ALTER TABLE `' + dbconfig.database + '`.`' + dbconfig.ticket_table + '`\
  ADD PRIMARY KEY (`ID`),\
  ADD KEY `USER_ID` (`USER_ID`);\
 ');
connection.query('\
ALTER TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '`\
  ADD PRIMARY KEY (`ID`);\
 ');

//auto increments

connection.query('\
ALTER TABLE `' + dbconfig.database + '`.`' + dbconfig.message_table + '`\
	MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;\
 ');
connection.query('\
ALTER TABLE `' + dbconfig.database + '`.`' + dbconfig.ticket_table + '`\
	MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;\
 ');
connection.query('\
ALTER TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '`\
	MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;\
 ');

//filters

/*connection.query('\
ALTER TABLE `' + dbconfig.database + '`.`' + dbconfig.message_table + '`\
	ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,\
    ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`TICKET_ID`) REFERENCES `tickets` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;\
 ');

connection.query('\
ALTER TABLE `' + dbconfig.database + '`.`' + dbconfig.ticket_table + '`\
	  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;\
 ');*/

console.log('Success: Database Created!')

connection.end();
