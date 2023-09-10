/*
 Navicat Premium Data Transfer

 Source Server         : PROJECTDATA
 Source Server Type    : Oracle
 Source Server Version : 190000 (Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production)
 Source Host           : localhost:1521
 Source Schema         : FAKESHOP

 Target Server Type    : Oracle
 Target Server Version : 190000 (Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production)
 File Encoding         : 65001

 Date: 10/09/2023 20:28:11
*/


-- ----------------------------
-- Table structure for CUSTOMER_ORDER
-- ----------------------------
DROP TABLE "FAKESHOP"."CUSTOMER_ORDER";
CREATE TABLE "FAKESHOP"."CUSTOMER_ORDER" (
  "ORDER_ID" NUMBER VISIBLE NOT NULL,
  "ORDER_DATE" DATE VISIBLE,
  "CUSTOMER_ID" NUMBER VISIBLE,
  "PRODUCT_ID" NUMBER VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of CUSTOMER_ORDER
-- ----------------------------
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000063', TO_DATE('2023-09-02 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000007');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000081', TO_DATE('2023-09-02 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000134', '1000000044');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000161', TO_DATE('2023-09-05 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000006');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000021', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000007');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000022', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000009');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000030', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000024');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000031', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000025');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000041', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000009');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000042', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000134', '1000000009');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000102', TO_DATE('2023-09-03 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000023');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000103', TO_DATE('2023-09-03 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000018');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000202', TO_DATE('2023-09-09 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000192', '1000000024');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000203', TO_DATE('2023-09-09 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000192', '1000000022');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000023', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000002');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000024', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000003');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000025', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000005');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000026', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000006');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000027', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000014');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000028', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000015');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000029', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000016');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000043', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000021');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000044', TO_DATE('2023-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000134', '1000000019');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000061', TO_DATE('2023-09-02 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000134', '1000000021');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000062', TO_DATE('2023-09-02 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000134', '1000000022');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000141', TO_DATE('2023-09-04 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000002', '1000000067');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000181', TO_DATE('2023-09-08 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000002');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000182', TO_DATE('2023-09-08 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000024');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000183', TO_DATE('2023-09-08 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000067');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000201', TO_DATE('2023-09-09 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000192', '1000000025');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000001', TO_DATE('2023-08-31 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000134', '1000000002');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000002', TO_DATE('2023-08-31 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000134', '1000000003');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000003', TO_DATE('2023-08-31 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000134', '1000000005');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000004', TO_DATE('2023-08-31 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000134', '1000000006');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000005', TO_DATE('2023-08-31 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000134', '1000000008');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000006', TO_DATE('2023-08-31 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000134', '1000000009');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000007', TO_DATE('2023-08-31 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000134', '1000000012');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000008', TO_DATE('2023-08-31 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000134', '1000000003');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000065', TO_DATE('2023-09-02 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000012');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000101', TO_DATE('2023-09-03 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000020');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000121', TO_DATE('2023-09-03 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000002', '1000000006');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000122', TO_DATE('2023-09-03 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000002', '1000000009');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000064', TO_DATE('2023-09-02 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000012');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000082', TO_DATE('2023-09-02 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000094', '1000000044');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000123', TO_DATE('2023-09-03 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000002');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000124', TO_DATE('2023-09-03 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000001', '1000000003');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000204', TO_DATE('2023-09-09 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000192', '1000000023');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000221', TO_DATE('2023-09-09 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000192', '1000000044');
INSERT INTO "FAKESHOP"."CUSTOMER_ORDER" VALUES ('1000000241', TO_DATE('2023-09-10 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1000000134', '1000000008');

-- ----------------------------
-- Primary Key structure for table CUSTOMER_ORDER
-- ----------------------------
ALTER TABLE "FAKESHOP"."CUSTOMER_ORDER" ADD CONSTRAINT "CUSTOMER_ORDER_PK" PRIMARY KEY ("ORDER_ID");

-- ----------------------------
-- Triggers structure for table CUSTOMER_ORDER
-- ----------------------------
CREATE TRIGGER "FAKESHOP"."ORDER_INSERT" AFTER INSERT ON "FAKESHOP"."CUSTOMER_ORDER" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
DECLARE
	ID NUMBER;
	TOTAL NUMBER;
BEGIN
	ID :=:NEW.ORDER_ID;
	INSERT INTO PURCHASED_ORDER(ORDER_ID,DELIVERY_STATUS)
  VALUES(ID,'NOT DISPATCHED');
	SELECT TOTAL_PRICE INTO TOTAL
	FROM CART
	WHERE PRODUCT_ID = :NEW.PRODUCT_ID AND
	CUSTOMER_ID = :NEW.CUSTOMER_ID;
	INSERT INTO TRANSACTION(TRANSACTION_ID,ORDER_ID,AMOUNT,PURCHASING_DATE)
	VALUES(ID,ID,TOTAL,SYSDATE);
	UPDATE WALLET
	SET TOTAL_CREDITS = TOTAL_CREDITS - TOTAL
	WHERE WALLET_ID = :NEW.CUSTOMER_ID;
END ;
/

-- ----------------------------
-- Foreign Keys structure for table CUSTOMER_ORDER
-- ----------------------------
ALTER TABLE "FAKESHOP"."CUSTOMER_ORDER" ADD CONSTRAINT "CUSTOMER_ORDER_FK" FOREIGN KEY ("PRODUCT_ID") REFERENCES "FAKESHOP"."PRODUCT" ("PRODUCT_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "FAKESHOP"."CUSTOMER_ORDER" ADD CONSTRAINT "CUSTOMER_ORDER_FK2" FOREIGN KEY ("CUSTOMER_ID") REFERENCES "FAKESHOP"."CUSTOMER" ("CUSTOMER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
