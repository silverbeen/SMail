select * from smail_db.user;

# 카테고리 테마
select * from smail_db.category_list;
insert into smail_db.category_list  values (4, "영어인ㅅ") ;

# 카테고리 
select * from smail_db.category;
insert into smail_db.category values (14, 2, "주문/청구서");

# 문구 
select * from smail_db.content;
insert into smail_db.content values(10, 2, "더워질수록 물을 많이 마시는 게 중요하다고 해요!\n\n숨이 턱 막히는 더운 날이지만,\n 00 님의 하루만큼은 보송하길 바랍니다. :)");


