PGDMP     +    6                w            quan_ly_truyen_tranh    10.6    10.6 �               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false                       1262    22872    quan_ly_truyen_tranh    DATABASE     �   CREATE DATABASE quan_ly_truyen_tranh WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
 $   DROP DATABASE quan_ly_truyen_tranh;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false                       0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    23118    account    TABLE     �   CREATE TABLE public.account (
    account_id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    remark text
);
    DROP TABLE public.account;
       public         postgres    false    3            �            1259    23141    account_role    TABLE     d   CREATE TABLE public.account_role (
    account_id integer NOT NULL,
    role_id integer NOT NULL
);
     DROP TABLE public.account_role;
       public         postgres    false    3            �            1259    23205    account_sequence    SEQUENCE     y   CREATE SEQUENCE public.account_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.account_sequence;
       public       postgres    false    3            �            1259    22887    bo_phan    TABLE     �   CREATE TABLE public.bo_phan (
    bo_phan_id integer NOT NULL,
    ten text NOT NULL,
    nguoi_quan_ly_id integer,
    trang_thai boolean DEFAULT true
);
    DROP TABLE public.bo_phan;
       public         postgres    false    3            �            1259    22885    bo_phan_bo_phan_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bo_phan_bo_phan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.bo_phan_bo_phan_id_seq;
       public       postgres    false    3    199                       0    0    bo_phan_bo_phan_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.bo_phan_bo_phan_id_seq OWNED BY public.bo_phan.bo_phan_id;
            public       postgres    false    198            �            1259    23223    chi_tiet_don_dat_mua_truyen    TABLE     �   CREATE TABLE public.chi_tiet_don_dat_mua_truyen (
    don_dat_mua_truyen_id integer NOT NULL,
    truyen_id integer NOT NULL,
    so_luong integer
);
 /   DROP TABLE public.chi_tiet_don_dat_mua_truyen;
       public         postgres    false    3            �            1259    23047    chi_tiet_hoa_don_nhap    TABLE     �   CREATE TABLE public.chi_tiet_hoa_don_nhap (
    hoa_don_nhap_id integer NOT NULL,
    truyen_id integer NOT NULL,
    so_luong integer
);
 )   DROP TABLE public.chi_tiet_hoa_don_nhap;
       public         postgres    false    3            �            1259    23178    chi_tiet_hoa_don_xuat    TABLE     �   CREATE TABLE public.chi_tiet_hoa_don_xuat (
    hoa_don_xuat_id integer NOT NULL,
    truyen_id integer NOT NULL,
    so_luong integer,
    don_gia_ban double precision
);
 )   DROP TABLE public.chi_tiet_hoa_don_xuat;
       public         postgres    false    3            �            1259    22990    cuon_truyen    TABLE       CREATE TABLE public.cuon_truyen (
    cuon_truyen_id integer NOT NULL,
    truyen_id integer NOT NULL,
    don_gia_nhap double precision,
    ngay_nhap timestamp without time zone,
    nha_cung_cap_id integer NOT NULL,
    nhan_vien_id integer,
    trang_thai_ban integer
);
    DROP TABLE public.cuon_truyen;
       public         postgres    false    3            �            1259    22988    cuon_truyen_cuon_truyen_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cuon_truyen_cuon_truyen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.cuon_truyen_cuon_truyen_id_seq;
       public       postgres    false    210    3                       0    0    cuon_truyen_cuon_truyen_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.cuon_truyen_cuon_truyen_id_seq OWNED BY public.cuon_truyen.cuon_truyen_id;
            public       postgres    false    209            �            1259    22950 
   dau_truyen    TABLE     }   CREATE TABLE public.dau_truyen (
    dau_truyen_id integer NOT NULL,
    tua_truyen text NOT NULL,
    trang_thai boolean
);
    DROP TABLE public.dau_truyen;
       public         postgres    false    3            �            1259    22948    dau_truyen_dau_truyen_id_seq    SEQUENCE     �   CREATE SEQUENCE public.dau_truyen_dau_truyen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.dau_truyen_dau_truyen_id_seq;
       public       postgres    false    3    207                       0    0    dau_truyen_dau_truyen_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.dau_truyen_dau_truyen_id_seq OWNED BY public.dau_truyen.dau_truyen_id;
            public       postgres    false    206            �            1259    23091    dich_gia    TABLE     �   CREATE TABLE public.dich_gia (
    dich_gia_id integer NOT NULL,
    ten text,
    ma_dich_gia text NOT NULL,
    ngay_sinh timestamp without time zone,
    dia_chi text,
    trang_thai boolean DEFAULT true
);
    DROP TABLE public.dich_gia;
       public         postgres    false    3            �            1259    23089    dich_gia_dich_gia_id_seq    SEQUENCE     �   CREATE SEQUENCE public.dich_gia_dich_gia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.dich_gia_dich_gia_id_seq;
       public       postgres    false    3    220                       0    0    dich_gia_dich_gia_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.dich_gia_dich_gia_id_seq OWNED BY public.dich_gia.dich_gia_id;
            public       postgres    false    219            �            1259    23212    don_dat_mua_truyen    TABLE     �   CREATE TABLE public.don_dat_mua_truyen (
    don_dat_mua_truyen_id integer NOT NULL,
    ngay_dat timestamp without time zone,
    tong_tien double precision,
    khach_hang_id integer NOT NULL,
    trang_thai integer
);
 &   DROP TABLE public.don_dat_mua_truyen;
       public         postgres    false    3            �            1259    23210 ,   don_dat_mua_truyen_don_dat_mua_truyen_id_seq    SEQUENCE     �   CREATE SEQUENCE public.don_dat_mua_truyen_don_dat_mua_truyen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 C   DROP SEQUENCE public.don_dat_mua_truyen_don_dat_mua_truyen_id_seq;
       public       postgres    false    3    234                       0    0 ,   don_dat_mua_truyen_don_dat_mua_truyen_id_seq    SEQUENCE OWNED BY     }   ALTER SEQUENCE public.don_dat_mua_truyen_don_dat_mua_truyen_id_seq OWNED BY public.don_dat_mua_truyen.don_dat_mua_truyen_id;
            public       postgres    false    233            �            1259    23236    don_dat_mua_truyen_sequence    SEQUENCE     �   CREATE SEQUENCE public.don_dat_mua_truyen_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.don_dat_mua_truyen_sequence;
       public       postgres    false    3            �            1259    23031    hoa_don_nhap    TABLE     �   CREATE TABLE public.hoa_don_nhap (
    hoa_don_nhap_id integer NOT NULL,
    ngay_ghi timestamp without time zone NOT NULL,
    nhan_vien_id integer NOT NULL,
    nha_cung_cap_id integer NOT NULL,
    tong_tien double precision,
    trang_thai boolean
);
     DROP TABLE public.hoa_don_nhap;
       public         postgres    false    3            �            1259    23029     hoa_don_nhap_hoa_don_nhap_id_seq    SEQUENCE     �   CREATE SEQUENCE public.hoa_don_nhap_hoa_don_nhap_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.hoa_don_nhap_hoa_don_nhap_id_seq;
       public       postgres    false    3    214                       0    0     hoa_don_nhap_hoa_don_nhap_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.hoa_don_nhap_hoa_don_nhap_id_seq OWNED BY public.hoa_don_nhap.hoa_don_nhap_id;
            public       postgres    false    213            �            1259    23167    hoa_don_xuat    TABLE     �   CREATE TABLE public.hoa_don_xuat (
    hoa_don_xuat_id integer NOT NULL,
    ngay_ghi timestamp without time zone NOT NULL,
    khach_hang_id integer NOT NULL,
    tong_tien double precision,
    trang_thai boolean DEFAULT true
);
     DROP TABLE public.hoa_don_xuat;
       public         postgres    false    3            �            1259    23201    hoa_don_xuat_sequence    SEQUENCE     ~   CREATE SEQUENCE public.hoa_don_xuat_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.hoa_don_xuat_sequence;
       public       postgres    false    3            �            1259    23154 
   khach_hang    TABLE     �   CREATE TABLE public.khach_hang (
    khach_hang_id integer NOT NULL,
    ten text,
    so_dien_thoai text,
    dia_chi text,
    email text,
    ngay_sinh timestamp without time zone,
    account_id integer
);
    DROP TABLE public.khach_hang;
       public         postgres    false    3            �            1259    23203    khach_hang_sequence    SEQUENCE     |   CREATE SEQUENCE public.khach_hang_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.khach_hang_sequence;
       public       postgres    false    3            �            1259    22875    nha_cung_cap    TABLE     �   CREATE TABLE public.nha_cung_cap (
    nha_cung_cap_id integer NOT NULL,
    ten text,
    dia_chi text,
    so_dien_thoai text,
    trang_thai boolean DEFAULT true
);
     DROP TABLE public.nha_cung_cap;
       public         postgres    false    3            �            1259    22873     nha_cung_cap_nha_cung_cap_id_seq    SEQUENCE     �   CREATE SEQUENCE public.nha_cung_cap_nha_cung_cap_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.nha_cung_cap_nha_cung_cap_id_seq;
       public       postgres    false    197    3                       0    0     nha_cung_cap_nha_cung_cap_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.nha_cung_cap_nha_cung_cap_id_seq OWNED BY public.nha_cung_cap.nha_cung_cap_id;
            public       postgres    false    196            �            1259    22934    nha_xuat_ban    TABLE     �   CREATE TABLE public.nha_xuat_ban (
    nha_xuat_ban_id integer NOT NULL,
    ma_nha_xuat_ban text NOT NULL,
    ten text,
    thong_tin text,
    trang_thai boolean DEFAULT true
);
     DROP TABLE public.nha_xuat_ban;
       public         postgres    false    3            �            1259    22932     nha_xuat_ban_nha_xuat_ban_id_seq    SEQUENCE     �   CREATE SEQUENCE public.nha_xuat_ban_nha_xuat_ban_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.nha_xuat_ban_nha_xuat_ban_id_seq;
       public       postgres    false    3    205                        0    0     nha_xuat_ban_nha_xuat_ban_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.nha_xuat_ban_nha_xuat_ban_id_seq OWNED BY public.nha_xuat_ban.nha_xuat_ban_id;
            public       postgres    false    204            �            1259    22901 	   nhan_vien    TABLE       CREATE TABLE public.nhan_vien (
    nhan_vien_id integer NOT NULL,
    ten text,
    so_dien_thoai text,
    ngay_sinh timestamp without time zone,
    gioi_tinh integer,
    luong_thang double precision,
    trang_thai boolean DEFAULT true,
    bo_phan_id integer NOT NULL
);
    DROP TABLE public.nhan_vien;
       public         postgres    false    3            �            1259    22899    nhan_vien_nhan_vien_id_seq    SEQUENCE     �   CREATE SEQUENCE public.nhan_vien_nhan_vien_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.nhan_vien_nhan_vien_id_seq;
       public       postgres    false    201    3            !           0    0    nhan_vien_nhan_vien_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.nhan_vien_nhan_vien_id_seq OWNED BY public.nhan_vien.nhan_vien_id;
            public       postgres    false    200            �            1259    23130    role    TABLE     i   CREATE TABLE public.role (
    role_id integer NOT NULL,
    role_name text NOT NULL,
    remark text
);
    DROP TABLE public.role;
       public         postgres    false    3            �            1259    23128    role_role_id_seq    SEQUENCE     �   CREATE SEQUENCE public.role_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.role_role_id_seq;
       public       postgres    false    224    3            "           0    0    role_role_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.role_role_id_seq OWNED BY public.role.role_id;
            public       postgres    false    223            �            1259    23062    tac_gia    TABLE     �   CREATE TABLE public.tac_gia (
    tac_gia_id integer NOT NULL,
    ten text,
    ma_tac_gia text NOT NULL,
    ngay_sinh timestamp without time zone,
    dia_chi text,
    trang_thai boolean DEFAULT true
);
    DROP TABLE public.tac_gia;
       public         postgres    false    3            �            1259    23060    tac_gia_tac_gia_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tac_gia_tac_gia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.tac_gia_tac_gia_id_seq;
       public       postgres    false    3    217            #           0    0    tac_gia_tac_gia_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.tac_gia_tac_gia_id_seq OWNED BY public.tac_gia.tac_gia_id;
            public       postgres    false    216            �            1259    22918    the_loai    TABLE     �   CREATE TABLE public.the_loai (
    the_loai_id integer NOT NULL,
    ma_the_loai text NOT NULL,
    ten text NOT NULL,
    trang_thai boolean DEFAULT true
);
    DROP TABLE public.the_loai;
       public         postgres    false    3            �            1259    22916    the_loai_the_loai_id_seq    SEQUENCE     �   CREATE SEQUENCE public.the_loai_the_loai_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.the_loai_the_loai_id_seq;
       public       postgres    false    3    203            $           0    0    the_loai_the_loai_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.the_loai_the_loai_id_seq OWNED BY public.the_loai.the_loai_id;
            public       postgres    false    202            �            1259    22961    truyen    TABLE     b  CREATE TABLE public.truyen (
    truyen_id integer NOT NULL,
    ten text,
    don_gia_ban double precision,
    ghi_chu text,
    the_loai_id integer NOT NULL,
    trang_thai boolean DEFAULT true,
    anh text,
    den_trang boolean DEFAULT false,
    ma_truyen text NOT NULL,
    nha_xuat_ban_id integer NOT NULL,
    dau_truyen_id integer NOT NULL
);
    DROP TABLE public.truyen;
       public         postgres    false    3            �            1259    23105    truyen_dich_gia    TABLE     j   CREATE TABLE public.truyen_dich_gia (
    dich_gia_id integer NOT NULL,
    truyen_id integer NOT NULL
);
 #   DROP TABLE public.truyen_dich_gia;
       public         postgres    false    3            �            1259    23207    truyen_sequence    SEQUENCE     x   CREATE SEQUENCE public.truyen_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.truyen_sequence;
       public       postgres    false    3            �            1259    23076    truyen_tac_gia    TABLE     h   CREATE TABLE public.truyen_tac_gia (
    tac_gia_id integer NOT NULL,
    truyen_id integer NOT NULL
);
 "   DROP TABLE public.truyen_tac_gia;
       public         postgres    false    3            �            1259    23013    truyen_to_mau    TABLE     �   CREATE TABLE public.truyen_to_mau (
    truyen_to_mau_id integer NOT NULL,
    ma_truyen_to_mau text NOT NULL,
    mo_ta text,
    ngay_to timestamp without time zone,
    truyen_id integer NOT NULL
);
 !   DROP TABLE public.truyen_to_mau;
       public         postgres    false    3            �            1259    23011 "   truyen_to_mau_truyen_to_mau_id_seq    SEQUENCE     �   CREATE SEQUENCE public.truyen_to_mau_truyen_to_mau_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.truyen_to_mau_truyen_to_mau_id_seq;
       public       postgres    false    3    212            %           0    0 "   truyen_to_mau_truyen_to_mau_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.truyen_to_mau_truyen_to_mau_id_seq OWNED BY public.truyen_to_mau.truyen_to_mau_id;
            public       postgres    false    211            �
           2604    22890    bo_phan bo_phan_id    DEFAULT     x   ALTER TABLE ONLY public.bo_phan ALTER COLUMN bo_phan_id SET DEFAULT nextval('public.bo_phan_bo_phan_id_seq'::regclass);
 A   ALTER TABLE public.bo_phan ALTER COLUMN bo_phan_id DROP DEFAULT;
       public       postgres    false    199    198    199                       2604    22993    cuon_truyen cuon_truyen_id    DEFAULT     �   ALTER TABLE ONLY public.cuon_truyen ALTER COLUMN cuon_truyen_id SET DEFAULT nextval('public.cuon_truyen_cuon_truyen_id_seq'::regclass);
 I   ALTER TABLE public.cuon_truyen ALTER COLUMN cuon_truyen_id DROP DEFAULT;
       public       postgres    false    209    210    210            �
           2604    22953    dau_truyen dau_truyen_id    DEFAULT     �   ALTER TABLE ONLY public.dau_truyen ALTER COLUMN dau_truyen_id SET DEFAULT nextval('public.dau_truyen_dau_truyen_id_seq'::regclass);
 G   ALTER TABLE public.dau_truyen ALTER COLUMN dau_truyen_id DROP DEFAULT;
       public       postgres    false    206    207    207                       2604    23094    dich_gia dich_gia_id    DEFAULT     |   ALTER TABLE ONLY public.dich_gia ALTER COLUMN dich_gia_id SET DEFAULT nextval('public.dich_gia_dich_gia_id_seq'::regclass);
 C   ALTER TABLE public.dich_gia ALTER COLUMN dich_gia_id DROP DEFAULT;
       public       postgres    false    219    220    220                       2604    23215 (   don_dat_mua_truyen don_dat_mua_truyen_id    DEFAULT     �   ALTER TABLE ONLY public.don_dat_mua_truyen ALTER COLUMN don_dat_mua_truyen_id SET DEFAULT nextval('public.don_dat_mua_truyen_don_dat_mua_truyen_id_seq'::regclass);
 W   ALTER TABLE public.don_dat_mua_truyen ALTER COLUMN don_dat_mua_truyen_id DROP DEFAULT;
       public       postgres    false    233    234    234                       2604    23034    hoa_don_nhap hoa_don_nhap_id    DEFAULT     �   ALTER TABLE ONLY public.hoa_don_nhap ALTER COLUMN hoa_don_nhap_id SET DEFAULT nextval('public.hoa_don_nhap_hoa_don_nhap_id_seq'::regclass);
 K   ALTER TABLE public.hoa_don_nhap ALTER COLUMN hoa_don_nhap_id DROP DEFAULT;
       public       postgres    false    214    213    214            �
           2604    22878    nha_cung_cap nha_cung_cap_id    DEFAULT     �   ALTER TABLE ONLY public.nha_cung_cap ALTER COLUMN nha_cung_cap_id SET DEFAULT nextval('public.nha_cung_cap_nha_cung_cap_id_seq'::regclass);
 K   ALTER TABLE public.nha_cung_cap ALTER COLUMN nha_cung_cap_id DROP DEFAULT;
       public       postgres    false    197    196    197            �
           2604    22937    nha_xuat_ban nha_xuat_ban_id    DEFAULT     �   ALTER TABLE ONLY public.nha_xuat_ban ALTER COLUMN nha_xuat_ban_id SET DEFAULT nextval('public.nha_xuat_ban_nha_xuat_ban_id_seq'::regclass);
 K   ALTER TABLE public.nha_xuat_ban ALTER COLUMN nha_xuat_ban_id DROP DEFAULT;
       public       postgres    false    204    205    205            �
           2604    22904    nhan_vien nhan_vien_id    DEFAULT     �   ALTER TABLE ONLY public.nhan_vien ALTER COLUMN nhan_vien_id SET DEFAULT nextval('public.nhan_vien_nhan_vien_id_seq'::regclass);
 E   ALTER TABLE public.nhan_vien ALTER COLUMN nhan_vien_id DROP DEFAULT;
       public       postgres    false    200    201    201            	           2604    23133    role role_id    DEFAULT     l   ALTER TABLE ONLY public.role ALTER COLUMN role_id SET DEFAULT nextval('public.role_role_id_seq'::regclass);
 ;   ALTER TABLE public.role ALTER COLUMN role_id DROP DEFAULT;
       public       postgres    false    224    223    224                       2604    23065    tac_gia tac_gia_id    DEFAULT     x   ALTER TABLE ONLY public.tac_gia ALTER COLUMN tac_gia_id SET DEFAULT nextval('public.tac_gia_tac_gia_id_seq'::regclass);
 A   ALTER TABLE public.tac_gia ALTER COLUMN tac_gia_id DROP DEFAULT;
       public       postgres    false    217    216    217            �
           2604    22921    the_loai the_loai_id    DEFAULT     |   ALTER TABLE ONLY public.the_loai ALTER COLUMN the_loai_id SET DEFAULT nextval('public.the_loai_the_loai_id_seq'::regclass);
 C   ALTER TABLE public.the_loai ALTER COLUMN the_loai_id DROP DEFAULT;
       public       postgres    false    202    203    203                       2604    23016    truyen_to_mau truyen_to_mau_id    DEFAULT     �   ALTER TABLE ONLY public.truyen_to_mau ALTER COLUMN truyen_to_mau_id SET DEFAULT nextval('public.truyen_to_mau_truyen_to_mau_id_seq'::regclass);
 M   ALTER TABLE public.truyen_to_mau ALTER COLUMN truyen_to_mau_id DROP DEFAULT;
       public       postgres    false    211    212    212                      0    23118    account 
   TABLE DATA               I   COPY public.account (account_id, username, password, remark) FROM stdin;
    public       postgres    false    222   ��                 0    23141    account_role 
   TABLE DATA               ;   COPY public.account_role (account_id, role_id) FROM stdin;
    public       postgres    false    225   ��       �          0    22887    bo_phan 
   TABLE DATA               P   COPY public.bo_phan (bo_phan_id, ten, nguoi_quan_ly_id, trang_thai) FROM stdin;
    public       postgres    false    199   �                 0    23223    chi_tiet_don_dat_mua_truyen 
   TABLE DATA               a   COPY public.chi_tiet_don_dat_mua_truyen (don_dat_mua_truyen_id, truyen_id, so_luong) FROM stdin;
    public       postgres    false    235   g�       �          0    23047    chi_tiet_hoa_don_nhap 
   TABLE DATA               U   COPY public.chi_tiet_hoa_don_nhap (hoa_don_nhap_id, truyen_id, so_luong) FROM stdin;
    public       postgres    false    215   ��                 0    23178    chi_tiet_hoa_don_xuat 
   TABLE DATA               b   COPY public.chi_tiet_hoa_don_xuat (hoa_don_xuat_id, truyen_id, so_luong, don_gia_ban) FROM stdin;
    public       postgres    false    228   ��       �          0    22990    cuon_truyen 
   TABLE DATA               �   COPY public.cuon_truyen (cuon_truyen_id, truyen_id, don_gia_nhap, ngay_nhap, nha_cung_cap_id, nhan_vien_id, trang_thai_ban) FROM stdin;
    public       postgres    false    210    �       �          0    22950 
   dau_truyen 
   TABLE DATA               K   COPY public.dau_truyen (dau_truyen_id, tua_truyen, trang_thai) FROM stdin;
    public       postgres    false    207   ��                  0    23091    dich_gia 
   TABLE DATA               a   COPY public.dich_gia (dich_gia_id, ten, ma_dich_gia, ngay_sinh, dia_chi, trang_thai) FROM stdin;
    public       postgres    false    220   8�                 0    23212    don_dat_mua_truyen 
   TABLE DATA               s   COPY public.don_dat_mua_truyen (don_dat_mua_truyen_id, ngay_dat, tong_tien, khach_hang_id, trang_thai) FROM stdin;
    public       postgres    false    234   ��       �          0    23031    hoa_don_nhap 
   TABLE DATA               w   COPY public.hoa_don_nhap (hoa_don_nhap_id, ngay_ghi, nhan_vien_id, nha_cung_cap_id, tong_tien, trang_thai) FROM stdin;
    public       postgres    false    214   H�                 0    23167    hoa_don_xuat 
   TABLE DATA               g   COPY public.hoa_don_xuat (hoa_don_xuat_id, ngay_ghi, khach_hang_id, tong_tien, trang_thai) FROM stdin;
    public       postgres    false    227   e�                 0    23154 
   khach_hang 
   TABLE DATA               n   COPY public.khach_hang (khach_hang_id, ten, so_dien_thoai, dia_chi, email, ngay_sinh, account_id) FROM stdin;
    public       postgres    false    226   ��       �          0    22875    nha_cung_cap 
   TABLE DATA               `   COPY public.nha_cung_cap (nha_cung_cap_id, ten, dia_chi, so_dien_thoai, trang_thai) FROM stdin;
    public       postgres    false    197   ��       �          0    22934    nha_xuat_ban 
   TABLE DATA               d   COPY public.nha_xuat_ban (nha_xuat_ban_id, ma_nha_xuat_ban, ten, thong_tin, trang_thai) FROM stdin;
    public       postgres    false    205   *�       �          0    22901 	   nhan_vien 
   TABLE DATA               �   COPY public.nhan_vien (nhan_vien_id, ten, so_dien_thoai, ngay_sinh, gioi_tinh, luong_thang, trang_thai, bo_phan_id) FROM stdin;
    public       postgres    false    201   ��                 0    23130    role 
   TABLE DATA               :   COPY public.role (role_id, role_name, remark) FROM stdin;
    public       postgres    false    224   Z�       �          0    23062    tac_gia 
   TABLE DATA               ^   COPY public.tac_gia (tac_gia_id, ten, ma_tac_gia, ngay_sinh, dia_chi, trang_thai) FROM stdin;
    public       postgres    false    217   ��       �          0    22918    the_loai 
   TABLE DATA               M   COPY public.the_loai (the_loai_id, ma_the_loai, ten, trang_thai) FROM stdin;
    public       postgres    false    203   Y�       �          0    22961    truyen 
   TABLE DATA               �   COPY public.truyen (truyen_id, ten, don_gia_ban, ghi_chu, the_loai_id, trang_thai, anh, den_trang, ma_truyen, nha_xuat_ban_id, dau_truyen_id) FROM stdin;
    public       postgres    false    208   ��                 0    23105    truyen_dich_gia 
   TABLE DATA               A   COPY public.truyen_dich_gia (dich_gia_id, truyen_id) FROM stdin;
    public       postgres    false    221   o�       �          0    23076    truyen_tac_gia 
   TABLE DATA               ?   COPY public.truyen_tac_gia (tac_gia_id, truyen_id) FROM stdin;
    public       postgres    false    218   �       �          0    23013    truyen_to_mau 
   TABLE DATA               f   COPY public.truyen_to_mau (truyen_to_mau_id, ma_truyen_to_mau, mo_ta, ngay_to, truyen_id) FROM stdin;
    public       postgres    false    212   ��       &           0    0    account_sequence    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.account_sequence', 10, true);
            public       postgres    false    231            '           0    0    bo_phan_bo_phan_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.bo_phan_bo_phan_id_seq', 2, true);
            public       postgres    false    198            (           0    0    cuon_truyen_cuon_truyen_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.cuon_truyen_cuon_truyen_id_seq', 26, true);
            public       postgres    false    209            )           0    0    dau_truyen_dau_truyen_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.dau_truyen_dau_truyen_id_seq', 1, false);
            public       postgres    false    206            *           0    0    dich_gia_dich_gia_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.dich_gia_dich_gia_id_seq', 10, true);
            public       postgres    false    219            +           0    0 ,   don_dat_mua_truyen_don_dat_mua_truyen_id_seq    SEQUENCE SET     [   SELECT pg_catalog.setval('public.don_dat_mua_truyen_don_dat_mua_truyen_id_seq', 1, false);
            public       postgres    false    233            ,           0    0    don_dat_mua_truyen_sequence    SEQUENCE SET     J   SELECT pg_catalog.setval('public.don_dat_mua_truyen_sequence', 48, true);
            public       postgres    false    236            -           0    0     hoa_don_nhap_hoa_don_nhap_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.hoa_don_nhap_hoa_don_nhap_id_seq', 1, false);
            public       postgres    false    213            .           0    0    hoa_don_xuat_sequence    SEQUENCE SET     D   SELECT pg_catalog.setval('public.hoa_don_xuat_sequence', 1, false);
            public       postgres    false    229            /           0    0    khach_hang_sequence    SEQUENCE SET     B   SELECT pg_catalog.setval('public.khach_hang_sequence', 51, true);
            public       postgres    false    230            0           0    0     nha_cung_cap_nha_cung_cap_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.nha_cung_cap_nha_cung_cap_id_seq', 1, false);
            public       postgres    false    196            1           0    0     nha_xuat_ban_nha_xuat_ban_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.nha_xuat_ban_nha_xuat_ban_id_seq', 1, true);
            public       postgres    false    204            2           0    0    nhan_vien_nhan_vien_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.nhan_vien_nhan_vien_id_seq', 20, true);
            public       postgres    false    200            3           0    0    role_role_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.role_role_id_seq', 1, false);
            public       postgres    false    223            4           0    0    tac_gia_tac_gia_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.tac_gia_tac_gia_id_seq', 9, true);
            public       postgres    false    216            5           0    0    the_loai_the_loai_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.the_loai_the_loai_id_seq', 7, true);
            public       postgres    false    202            6           0    0    truyen_sequence    SEQUENCE SET     =   SELECT pg_catalog.setval('public.truyen_sequence', 4, true);
            public       postgres    false    232            7           0    0 "   truyen_to_mau_truyen_to_mau_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.truyen_to_mau_truyen_to_mau_id_seq', 1, false);
            public       postgres    false    211            C           2606    23125    account account_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (account_id);
 >   ALTER TABLE ONLY public.account DROP CONSTRAINT account_pkey;
       public         postgres    false    222            K           2606    23200    account_role account_role_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.account_role
    ADD CONSTRAINT account_role_pkey PRIMARY KEY (account_id, role_id);
 H   ALTER TABLE ONLY public.account_role DROP CONSTRAINT account_role_pkey;
       public         postgres    false    225    225            E           2606    23127    account account_username_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_username_key UNIQUE (username);
 F   ALTER TABLE ONLY public.account DROP CONSTRAINT account_username_key;
       public         postgres    false    222                       2606    22896    bo_phan bo_phan_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.bo_phan
    ADD CONSTRAINT bo_phan_pkey PRIMARY KEY (bo_phan_id);
 >   ALTER TABLE ONLY public.bo_phan DROP CONSTRAINT bo_phan_pkey;
       public         postgres    false    199                       2606    22898    bo_phan bo_phan_ten_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.bo_phan
    ADD CONSTRAINT bo_phan_ten_key UNIQUE (ten);
 A   ALTER TABLE ONLY public.bo_phan DROP CONSTRAINT bo_phan_ten_key;
       public         postgres    false    199            )           2606    22995    cuon_truyen cuon_truyen_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.cuon_truyen
    ADD CONSTRAINT cuon_truyen_pkey PRIMARY KEY (cuon_truyen_id);
 F   ALTER TABLE ONLY public.cuon_truyen DROP CONSTRAINT cuon_truyen_pkey;
       public         postgres    false    210            !           2606    22958    dau_truyen dau_truyen_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.dau_truyen
    ADD CONSTRAINT dau_truyen_pkey PRIMARY KEY (dau_truyen_id);
 D   ALTER TABLE ONLY public.dau_truyen DROP CONSTRAINT dau_truyen_pkey;
       public         postgres    false    207            #           2606    22960 $   dau_truyen dau_truyen_tua_truyen_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.dau_truyen
    ADD CONSTRAINT dau_truyen_tua_truyen_key UNIQUE (tua_truyen);
 N   ALTER TABLE ONLY public.dau_truyen DROP CONSTRAINT dau_truyen_tua_truyen_key;
       public         postgres    false    207            ;           2606    23104 !   dich_gia dich_gia_ma_dich_gia_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.dich_gia
    ADD CONSTRAINT dich_gia_ma_dich_gia_key UNIQUE (ma_dich_gia);
 K   ALTER TABLE ONLY public.dich_gia DROP CONSTRAINT dich_gia_ma_dich_gia_key;
       public         postgres    false    220            =           2606    23100    dich_gia dich_gia_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.dich_gia
    ADD CONSTRAINT dich_gia_pkey PRIMARY KEY (dich_gia_id);
 @   ALTER TABLE ONLY public.dich_gia DROP CONSTRAINT dich_gia_pkey;
       public         postgres    false    220            ?           2606    23102    dich_gia dich_gia_ten_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.dich_gia
    ADD CONSTRAINT dich_gia_ten_key UNIQUE (ten);
 C   ALTER TABLE ONLY public.dich_gia DROP CONSTRAINT dich_gia_ten_key;
       public         postgres    false    220            S           2606    23217 *   don_dat_mua_truyen don_dat_mua_truyen_pkey 
   CONSTRAINT     {   ALTER TABLE ONLY public.don_dat_mua_truyen
    ADD CONSTRAINT don_dat_mua_truyen_pkey PRIMARY KEY (don_dat_mua_truyen_id);
 T   ALTER TABLE ONLY public.don_dat_mua_truyen DROP CONSTRAINT don_dat_mua_truyen_pkey;
       public         postgres    false    234            U           2606    23244 :   chi_tiet_don_dat_mua_truyen don_dat_mua_truyen_truyen_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.chi_tiet_don_dat_mua_truyen
    ADD CONSTRAINT don_dat_mua_truyen_truyen_pkey PRIMARY KEY (don_dat_mua_truyen_id, truyen_id);
 d   ALTER TABLE ONLY public.chi_tiet_don_dat_mua_truyen DROP CONSTRAINT don_dat_mua_truyen_truyen_pkey;
       public         postgres    false    235    235            /           2606    23036    hoa_don_nhap hoa_don_nhap_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.hoa_don_nhap
    ADD CONSTRAINT hoa_don_nhap_pkey PRIMARY KEY (hoa_don_nhap_id);
 H   ALTER TABLE ONLY public.hoa_don_nhap DROP CONSTRAINT hoa_don_nhap_pkey;
       public         postgres    false    214            1           2606    23194 .   chi_tiet_hoa_don_nhap hoa_don_nhap_truyen_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.chi_tiet_hoa_don_nhap
    ADD CONSTRAINT hoa_don_nhap_truyen_pkey PRIMARY KEY (hoa_don_nhap_id, truyen_id);
 X   ALTER TABLE ONLY public.chi_tiet_hoa_don_nhap DROP CONSTRAINT hoa_don_nhap_truyen_pkey;
       public         postgres    false    215    215            O           2606    23172    hoa_don_xuat hoa_don_xuat_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.hoa_don_xuat
    ADD CONSTRAINT hoa_don_xuat_pkey PRIMARY KEY (hoa_don_xuat_id);
 H   ALTER TABLE ONLY public.hoa_don_xuat DROP CONSTRAINT hoa_don_xuat_pkey;
       public         postgres    false    227            Q           2606    23192 .   chi_tiet_hoa_don_xuat hoa_don_xuat_truyen_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.chi_tiet_hoa_don_xuat
    ADD CONSTRAINT hoa_don_xuat_truyen_pkey PRIMARY KEY (hoa_don_xuat_id, truyen_id);
 X   ALTER TABLE ONLY public.chi_tiet_hoa_don_xuat DROP CONSTRAINT hoa_don_xuat_truyen_pkey;
       public         postgres    false    228    228            M           2606    23161    khach_hang khach_hang_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.khach_hang
    ADD CONSTRAINT khach_hang_pkey PRIMARY KEY (khach_hang_id);
 D   ALTER TABLE ONLY public.khach_hang DROP CONSTRAINT khach_hang_pkey;
       public         postgres    false    226                       2606    22884    nha_cung_cap nha_cung_cap_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.nha_cung_cap
    ADD CONSTRAINT nha_cung_cap_pkey PRIMARY KEY (nha_cung_cap_id);
 H   ALTER TABLE ONLY public.nha_cung_cap DROP CONSTRAINT nha_cung_cap_pkey;
       public         postgres    false    197                       2606    22945 -   nha_xuat_ban nha_xuat_ban_ma_nha_xuat_ban_key 
   CONSTRAINT     s   ALTER TABLE ONLY public.nha_xuat_ban
    ADD CONSTRAINT nha_xuat_ban_ma_nha_xuat_ban_key UNIQUE (ma_nha_xuat_ban);
 W   ALTER TABLE ONLY public.nha_xuat_ban DROP CONSTRAINT nha_xuat_ban_ma_nha_xuat_ban_key;
       public         postgres    false    205                       2606    22943    nha_xuat_ban nha_xuat_ban_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.nha_xuat_ban
    ADD CONSTRAINT nha_xuat_ban_pkey PRIMARY KEY (nha_xuat_ban_id);
 H   ALTER TABLE ONLY public.nha_xuat_ban DROP CONSTRAINT nha_xuat_ban_pkey;
       public         postgres    false    205                       2606    22947 !   nha_xuat_ban nha_xuat_ban_ten_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.nha_xuat_ban
    ADD CONSTRAINT nha_xuat_ban_ten_key UNIQUE (ten);
 K   ALTER TABLE ONLY public.nha_xuat_ban DROP CONSTRAINT nha_xuat_ban_ten_key;
       public         postgres    false    205                       2606    22910    nhan_vien nhan_vien_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.nhan_vien
    ADD CONSTRAINT nhan_vien_pkey PRIMARY KEY (nhan_vien_id);
 B   ALTER TABLE ONLY public.nhan_vien DROP CONSTRAINT nhan_vien_pkey;
       public         postgres    false    201            G           2606    23138    role role_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_id);
 8   ALTER TABLE ONLY public.role DROP CONSTRAINT role_pkey;
       public         postgres    false    224            I           2606    23140    role role_role_name_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_role_name_key UNIQUE (role_name);
 A   ALTER TABLE ONLY public.role DROP CONSTRAINT role_role_name_key;
       public         postgres    false    224            3           2606    23075    tac_gia tac_gia_ma_tac_gia_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.tac_gia
    ADD CONSTRAINT tac_gia_ma_tac_gia_key UNIQUE (ma_tac_gia);
 H   ALTER TABLE ONLY public.tac_gia DROP CONSTRAINT tac_gia_ma_tac_gia_key;
       public         postgres    false    217            5           2606    23071    tac_gia tac_gia_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.tac_gia
    ADD CONSTRAINT tac_gia_pkey PRIMARY KEY (tac_gia_id);
 >   ALTER TABLE ONLY public.tac_gia DROP CONSTRAINT tac_gia_pkey;
       public         postgres    false    217            7           2606    23073    tac_gia tac_gia_ten_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.tac_gia
    ADD CONSTRAINT tac_gia_ten_key UNIQUE (ten);
 A   ALTER TABLE ONLY public.tac_gia DROP CONSTRAINT tac_gia_ten_key;
       public         postgres    false    217                       2606    22929 !   the_loai the_loai_ma_the_loai_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.the_loai
    ADD CONSTRAINT the_loai_ma_the_loai_key UNIQUE (ma_the_loai);
 K   ALTER TABLE ONLY public.the_loai DROP CONSTRAINT the_loai_ma_the_loai_key;
       public         postgres    false    203                       2606    22927    the_loai the_loai_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.the_loai
    ADD CONSTRAINT the_loai_pkey PRIMARY KEY (the_loai_id);
 @   ALTER TABLE ONLY public.the_loai DROP CONSTRAINT the_loai_pkey;
       public         postgres    false    203                       2606    22931    the_loai the_loai_ten_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.the_loai
    ADD CONSTRAINT the_loai_ten_key UNIQUE (ten);
 C   ALTER TABLE ONLY public.the_loai DROP CONSTRAINT the_loai_ten_key;
       public         postgres    false    203            A           2606    23198 $   truyen_dich_gia truyen_dich_gia_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.truyen_dich_gia
    ADD CONSTRAINT truyen_dich_gia_pkey PRIMARY KEY (truyen_id, dich_gia_id);
 N   ALTER TABLE ONLY public.truyen_dich_gia DROP CONSTRAINT truyen_dich_gia_pkey;
       public         postgres    false    221    221            %           2606    22972    truyen truyen_ma_truyen_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.truyen
    ADD CONSTRAINT truyen_ma_truyen_key UNIQUE (ma_truyen);
 E   ALTER TABLE ONLY public.truyen DROP CONSTRAINT truyen_ma_truyen_key;
       public         postgres    false    208            '           2606    22970    truyen truyen_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.truyen
    ADD CONSTRAINT truyen_pkey PRIMARY KEY (truyen_id);
 <   ALTER TABLE ONLY public.truyen DROP CONSTRAINT truyen_pkey;
       public         postgres    false    208            9           2606    23196 "   truyen_tac_gia truyen_tac_gia_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY public.truyen_tac_gia
    ADD CONSTRAINT truyen_tac_gia_pkey PRIMARY KEY (truyen_id, tac_gia_id);
 L   ALTER TABLE ONLY public.truyen_tac_gia DROP CONSTRAINT truyen_tac_gia_pkey;
       public         postgres    false    218    218            +           2606    23023 0   truyen_to_mau truyen_to_mau_ma_truyen_to_mau_key 
   CONSTRAINT     w   ALTER TABLE ONLY public.truyen_to_mau
    ADD CONSTRAINT truyen_to_mau_ma_truyen_to_mau_key UNIQUE (ma_truyen_to_mau);
 Z   ALTER TABLE ONLY public.truyen_to_mau DROP CONSTRAINT truyen_to_mau_ma_truyen_to_mau_key;
       public         postgres    false    212            -           2606    23021     truyen_to_mau truyen_to_mau_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.truyen_to_mau
    ADD CONSTRAINT truyen_to_mau_pkey PRIMARY KEY (truyen_to_mau_id);
 J   ALTER TABLE ONLY public.truyen_to_mau DROP CONSTRAINT truyen_to_mau_pkey;
       public         postgres    false    212            f           2606    23144 )   account_role account_role_account_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.account_role
    ADD CONSTRAINT account_role_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(account_id);
 S   ALTER TABLE ONLY public.account_role DROP CONSTRAINT account_role_account_id_fkey;
       public       postgres    false    222    2883    225            g           2606    23149 &   account_role account_role_role_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.account_role
    ADD CONSTRAINT account_role_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(role_id);
 P   ALTER TABLE ONLY public.account_role DROP CONSTRAINT account_role_role_id_fkey;
       public       postgres    false    224    2887    225            m           2606    23226 R   chi_tiet_don_dat_mua_truyen chi_tiet_don_dat_mua_truyen_don_dat_mua_truyen_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chi_tiet_don_dat_mua_truyen
    ADD CONSTRAINT chi_tiet_don_dat_mua_truyen_don_dat_mua_truyen_id_fkey FOREIGN KEY (don_dat_mua_truyen_id) REFERENCES public.don_dat_mua_truyen(don_dat_mua_truyen_id);
 |   ALTER TABLE ONLY public.chi_tiet_don_dat_mua_truyen DROP CONSTRAINT chi_tiet_don_dat_mua_truyen_don_dat_mua_truyen_id_fkey;
       public       postgres    false    2899    234    235            n           2606    23231 F   chi_tiet_don_dat_mua_truyen chi_tiet_don_dat_mua_truyen_truyen_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chi_tiet_don_dat_mua_truyen
    ADD CONSTRAINT chi_tiet_don_dat_mua_truyen_truyen_id_fkey FOREIGN KEY (truyen_id) REFERENCES public.truyen(truyen_id);
 p   ALTER TABLE ONLY public.chi_tiet_don_dat_mua_truyen DROP CONSTRAINT chi_tiet_don_dat_mua_truyen_truyen_id_fkey;
       public       postgres    false    208    2855    235            `           2606    23050 @   chi_tiet_hoa_don_nhap chi_tiet_hoa_don_nhap_hoa_don_nhap_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chi_tiet_hoa_don_nhap
    ADD CONSTRAINT chi_tiet_hoa_don_nhap_hoa_don_nhap_id_fkey FOREIGN KEY (hoa_don_nhap_id) REFERENCES public.hoa_don_nhap(hoa_don_nhap_id);
 j   ALTER TABLE ONLY public.chi_tiet_hoa_don_nhap DROP CONSTRAINT chi_tiet_hoa_don_nhap_hoa_don_nhap_id_fkey;
       public       postgres    false    214    215    2863            a           2606    23055 :   chi_tiet_hoa_don_nhap chi_tiet_hoa_don_nhap_truyen_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chi_tiet_hoa_don_nhap
    ADD CONSTRAINT chi_tiet_hoa_don_nhap_truyen_id_fkey FOREIGN KEY (truyen_id) REFERENCES public.truyen(truyen_id);
 d   ALTER TABLE ONLY public.chi_tiet_hoa_don_nhap DROP CONSTRAINT chi_tiet_hoa_don_nhap_truyen_id_fkey;
       public       postgres    false    215    2855    208            j           2606    23181 @   chi_tiet_hoa_don_xuat chi_tiet_hoa_don_xuat_hoa_don_xuat_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chi_tiet_hoa_don_xuat
    ADD CONSTRAINT chi_tiet_hoa_don_xuat_hoa_don_xuat_id_fkey FOREIGN KEY (hoa_don_xuat_id) REFERENCES public.hoa_don_xuat(hoa_don_xuat_id);
 j   ALTER TABLE ONLY public.chi_tiet_hoa_don_xuat DROP CONSTRAINT chi_tiet_hoa_don_xuat_hoa_don_xuat_id_fkey;
       public       postgres    false    227    228    2895            k           2606    23186 :   chi_tiet_hoa_don_xuat chi_tiet_hoa_don_xuat_truyen_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chi_tiet_hoa_don_xuat
    ADD CONSTRAINT chi_tiet_hoa_don_xuat_truyen_id_fkey FOREIGN KEY (truyen_id) REFERENCES public.truyen(truyen_id);
 d   ALTER TABLE ONLY public.chi_tiet_hoa_don_xuat DROP CONSTRAINT chi_tiet_hoa_don_xuat_truyen_id_fkey;
       public       postgres    false    208    2855    228            Z           2606    22996 ,   cuon_truyen cuon_truyen_nha_cung_cap_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cuon_truyen
    ADD CONSTRAINT cuon_truyen_nha_cung_cap_id_fkey FOREIGN KEY (nha_cung_cap_id) REFERENCES public.nha_cung_cap(nha_cung_cap_id);
 V   ALTER TABLE ONLY public.cuon_truyen DROP CONSTRAINT cuon_truyen_nha_cung_cap_id_fkey;
       public       postgres    false    2829    197    210            [           2606    23001 )   cuon_truyen cuon_truyen_nhan_vien_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cuon_truyen
    ADD CONSTRAINT cuon_truyen_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(nhan_vien_id);
 S   ALTER TABLE ONLY public.cuon_truyen DROP CONSTRAINT cuon_truyen_nhan_vien_id_fkey;
       public       postgres    false    210    201    2835            \           2606    23006 &   cuon_truyen cuon_truyen_truyen_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cuon_truyen
    ADD CONSTRAINT cuon_truyen_truyen_id_fkey FOREIGN KEY (truyen_id) REFERENCES public.truyen(truyen_id);
 P   ALTER TABLE ONLY public.cuon_truyen DROP CONSTRAINT cuon_truyen_truyen_id_fkey;
       public       postgres    false    210    2855    208            l           2606    23218 8   don_dat_mua_truyen don_dat_mua_truyen_khach_hang_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.don_dat_mua_truyen
    ADD CONSTRAINT don_dat_mua_truyen_khach_hang_id_fkey FOREIGN KEY (khach_hang_id) REFERENCES public.khach_hang(khach_hang_id);
 b   ALTER TABLE ONLY public.don_dat_mua_truyen DROP CONSTRAINT don_dat_mua_truyen_khach_hang_id_fkey;
       public       postgres    false    2893    234    226            _           2606    23042 .   hoa_don_nhap hoa_don_nhap_nha_cung_cap_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoa_don_nhap
    ADD CONSTRAINT hoa_don_nhap_nha_cung_cap_id_fkey FOREIGN KEY (nha_cung_cap_id) REFERENCES public.nha_cung_cap(nha_cung_cap_id);
 X   ALTER TABLE ONLY public.hoa_don_nhap DROP CONSTRAINT hoa_don_nhap_nha_cung_cap_id_fkey;
       public       postgres    false    2829    214    197            ^           2606    23037 +   hoa_don_nhap hoa_don_nhap_nhan_vien_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoa_don_nhap
    ADD CONSTRAINT hoa_don_nhap_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(nhan_vien_id);
 U   ALTER TABLE ONLY public.hoa_don_nhap DROP CONSTRAINT hoa_don_nhap_nhan_vien_id_fkey;
       public       postgres    false    214    201    2835            i           2606    23173 ,   hoa_don_xuat hoa_don_xuat_khach_hang_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoa_don_xuat
    ADD CONSTRAINT hoa_don_xuat_khach_hang_id_fkey FOREIGN KEY (khach_hang_id) REFERENCES public.khach_hang(khach_hang_id);
 V   ALTER TABLE ONLY public.hoa_don_xuat DROP CONSTRAINT hoa_don_xuat_khach_hang_id_fkey;
       public       postgres    false    226    227    2893            h           2606    23238 "   khach_hang khach_hang_account_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.khach_hang
    ADD CONSTRAINT khach_hang_account_fkey FOREIGN KEY (account_id) REFERENCES public.account(account_id);
 L   ALTER TABLE ONLY public.khach_hang DROP CONSTRAINT khach_hang_account_fkey;
       public       postgres    false    226    2883    222            V           2606    22911 #   nhan_vien nhan_vien_bo_phan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.nhan_vien
    ADD CONSTRAINT nhan_vien_bo_phan_id_fkey FOREIGN KEY (bo_phan_id) REFERENCES public.bo_phan(bo_phan_id);
 M   ALTER TABLE ONLY public.nhan_vien DROP CONSTRAINT nhan_vien_bo_phan_id_fkey;
       public       postgres    false    2831    201    199            Y           2606    22983     truyen truyen_dau_truyen_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.truyen
    ADD CONSTRAINT truyen_dau_truyen_id_fkey FOREIGN KEY (dau_truyen_id) REFERENCES public.dau_truyen(dau_truyen_id);
 J   ALTER TABLE ONLY public.truyen DROP CONSTRAINT truyen_dau_truyen_id_fkey;
       public       postgres    false    207    2849    208            d           2606    23108 0   truyen_dich_gia truyen_dich_gia_dich_gia_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.truyen_dich_gia
    ADD CONSTRAINT truyen_dich_gia_dich_gia_id_fkey FOREIGN KEY (dich_gia_id) REFERENCES public.dich_gia(dich_gia_id);
 Z   ALTER TABLE ONLY public.truyen_dich_gia DROP CONSTRAINT truyen_dich_gia_dich_gia_id_fkey;
       public       postgres    false    220    221    2877            e           2606    23113 .   truyen_dich_gia truyen_dich_gia_truyen_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.truyen_dich_gia
    ADD CONSTRAINT truyen_dich_gia_truyen_id_fkey FOREIGN KEY (truyen_id) REFERENCES public.truyen(truyen_id);
 X   ALTER TABLE ONLY public.truyen_dich_gia DROP CONSTRAINT truyen_dich_gia_truyen_id_fkey;
       public       postgres    false    221    208    2855            X           2606    22978 "   truyen truyen_nha_xuat_ban_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.truyen
    ADD CONSTRAINT truyen_nha_xuat_ban_id_fkey FOREIGN KEY (nha_xuat_ban_id) REFERENCES public.nha_xuat_ban(nha_xuat_ban_id);
 L   ALTER TABLE ONLY public.truyen DROP CONSTRAINT truyen_nha_xuat_ban_id_fkey;
       public       postgres    false    208    2845    205            b           2606    23079 -   truyen_tac_gia truyen_tac_gia_tac_gia_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.truyen_tac_gia
    ADD CONSTRAINT truyen_tac_gia_tac_gia_id_fkey FOREIGN KEY (tac_gia_id) REFERENCES public.tac_gia(tac_gia_id);
 W   ALTER TABLE ONLY public.truyen_tac_gia DROP CONSTRAINT truyen_tac_gia_tac_gia_id_fkey;
       public       postgres    false    218    2869    217            c           2606    23084 ,   truyen_tac_gia truyen_tac_gia_truyen_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.truyen_tac_gia
    ADD CONSTRAINT truyen_tac_gia_truyen_id_fkey FOREIGN KEY (truyen_id) REFERENCES public.truyen(truyen_id);
 V   ALTER TABLE ONLY public.truyen_tac_gia DROP CONSTRAINT truyen_tac_gia_truyen_id_fkey;
       public       postgres    false    208    2855    218            W           2606    22973    truyen truyen_the_loai_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.truyen
    ADD CONSTRAINT truyen_the_loai_id_fkey FOREIGN KEY (the_loai_id) REFERENCES public.the_loai(the_loai_id);
 H   ALTER TABLE ONLY public.truyen DROP CONSTRAINT truyen_the_loai_id_fkey;
       public       postgres    false    203    208    2839            ]           2606    23024 *   truyen_to_mau truyen_to_mau_truyen_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.truyen_to_mau
    ADD CONSTRAINT truyen_to_mau_truyen_id_fkey FOREIGN KEY (truyen_id) REFERENCES public.truyen(truyen_id);
 T   ALTER TABLE ONLY public.truyen_to_mau DROP CONSTRAINT truyen_to_mau_truyen_id_fkey;
       public       postgres    false    2855    212    208               5   x�3�LL����4���2��M�MJ-�4�99A��gqJZ1�H�c���� }            x�3�4�2�4����� ��      �   S   x�3�tz�{�BA��]k��/�S�8� /�Ӑ���E�����y
9��r%����JoQ�=��T�&��� F��� �(         O   x�-���0B�u��Ū�0��"䇧���lyZP_h�	h�g[Q{v�c����6���8[&@Wayӎ�G�����q���Z      �      x������ � �            x������ � �      �   �   x���ۍ!�oSE�/���
�K��GZ����đ�$TxK
���`�ڲs���Tְ��]�k�3��pn�������!��oK!%��j�.!Av)��j�������u#5�nd�Ql#�<�Z�!��E;eH�r+gA})�������!�%��OA��s���x��Y����Җ���;t��%�n�1_9���[�E      �   H   x�3�tJ,�M��,�2�t,,M���9]���2�3J��|������"��|�SN���<�<�
 ?F��� v�M          {   x�3��9�J!�Hs��c^����!�������%)X����]���-��Q>���8�@����%\F�~饕w��A���8��(d���#�x��[���d�������� ��W�         u   x�u���0E�o�b�yH��l�u�GGw��qi��XD�bSߴ�Q��P��f*x�R��)�O���z���[�|?�Ӭs�fW=��Oaθ	?:R�[�k�#����2�;6*      �      x������ � �            x������ � �         T  x����N�0���S���]ۉ�D
C��B�b�b�6�D�i����x�";K;�/�7�i
TjH�o˃���߲ ]
�R����b��f��Q��D�2���1^����哉�DI��$�&j���X�7� UJ�)���;!�n�wZY��(	�������"�Y��m�<�������� {[���B��﩮�؂�iYO	����R�.0���CH�!��4��}�P�po'�o��MiM�h�Y��7�./1�fdS�w=��m��7)��2�}:H�����N���u[�{*�B�#�#��M�Y�c��k����I>�%D	)�v���(���8��*?      �   4   x�3���8�@!�4/]!�ᮥ
��@���gfrZX��g	W� �0A      �   �   x�3��p200���8�@���ᮥ@T���p��<��\�#����Y�eQn���69��ڼ������
K�����g�g�E_z���
)w/M��5��5�c
2/,�(����� ��P�      �   �  x����N�0�g�)�E�ˏ�h�H@R��RuH��jF��Ry�HH��d`p�{�Mp��t�Q����s/E�S�*|n����$׫Q&"��2> r���"�H���Cgzc�%N�[S�)�O�^��󞞣q�g�~���[��D����w$DzCS��x��<�����p��W8-L�����b4�_EPv Ɓ��s��2��~�#]�\���Ckb��|��T�r �@���v�_��!C��&U�lG�b�<(�F:�o�@w.��L�r�Ut�"���="qB���]ڽ]�LD��N#�iz���`h���ARS��頌Q$������8g Ⱦ�����g��1�'���+F��?���
��\A��)^�         !   x�3�tt������2��u�ur�c���� X5�      �   �   x�3�t:�3S�/����d����ë�89--�u,�H���
�8��Z��|la��B���0���
~w���,�2�)z�ky����]�2\J+A�A�3�5�@�rxQ�BH���K+�2t���3���� �e��4%W!��J�y ���f���sx��_��E@��%�*��pw7ؔ=... $�Pl      �   u   x�=��
1D뙯�X�w�l�lmbr��&�x�{7w��33��1	vF�.|$뻎߿�K��$|q��\�'�v�T����7N�n?-����p4*�x�g)C?Ļ�bݝ[+�3�?�0�      �   �  x����n#E��=O�/0�����Ү���B���x=C챉g��ȉ�\!�v��!�B�=�M��.�B�.rH$wտ>�W5�(�yռ��b<�V��p��E=*�ޮ�Ŷ0�1��_���Z�]Um-��P�O���i�6�e��|�[�W�w��WM���JeZ<[W���T�˸��{��dW�"'�Yq�m���J~T7�a�y�
Z�l�{���J�������������P傔/\�˼�\Z�2�Ṫ�����ǌ��;y^o��v%̃S�R��i�����䷻����(3g���N���k�I3�����0:c�m[g{l;g{��N��������by>^)^`�+��|<��xh-%ɺ������V��8s^��ޠ���׷7��G�JMǌ�[�A���j/�u%s�l<���_���Ս{D�ۛ^^<&�i vA8����xx�ϼwm�cv>�˿~@�8���u����V�����/���
+��}'7��I��Q�"�`��XꝊ�EӠb���~8���O py@h>W�����P��"ޏ�S(B��i\a�)L��)��,�0�ܡ��,(���JN���$�&��sFß�LOHD%D+�N!ӊD��眈��КDLBİ"ƣ�	O��S���{�h"9�g�2��n��i��*S��2!NUT�r���B��=aY�!�����h�2dB�����Mb���r4�V�����	b5��r"D�N�Y������&A�fa�ෑ!bub�j6E�X4���k�|9�wU�X��C`&D�NlW��^n ��x9�%V���D�IkXb�.% bMr��*�wY�Z���5ڷ�Y�.�^����0k��1a�1k�vz�ˋ�&��a�Ǆ� ��]\����DN׫Ė5����e��5)f��1a�1���E�遰e-1�-��
"�,Ba�G/W�%b!A,�Ă	�����{+K,���X"��o��oK�B�X`���oK�Bb�K,8bmf�XHlY`��Y�	�{��B�k[Xb���"�&��e��*��6A�e���?₈�	b-K�7ق�E����ڰc��w���%ֆ{��M#�/���>�:q6������/�/[���X�����I�e/��a         �   x��[nC!���b���t/��:���O���'o�ĳ7��=��5^��H����(�C A$�DI$�DI$�DEQDEQDE4�DM4�DM4��C1�C1�C,��?!�Xb�%��*s���9��z,c      �   �   x��[nC!���b���t/��:���O���'o�ĳ7��=��5^��H����(�C A$�DI$�DI$�DEQDEQDE4�DM4�DM4��C1�C1�C,��?!�Xb�%��*s���9��z,c      �      x������ � �     