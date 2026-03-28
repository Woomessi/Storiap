/**
 * 三国志传记内容数据 - 索引文件
 *
 * 各人物传记独立文件按势力分目录存放于 ./biographies/ 下：
 *   魏书：./biographies/wei/*.js
 *   蜀书：./biographies/shu/*.js
 *   吴书：./biographies/wu/*.js
 *
 * 本文件负责将所有人物传记组合为统一的数据结构，
 * 导出 biographyData，供搜索与选择功能正常使用。
 */

// ── 魏书 ──────────────────────────────────────────────────
import caocao     from './biographies/wei/caocao.js'
import caopi      from './biographies/wei/caopi.js'
import caorui     from './biographies/wei/caorui.js'
import shaodiiji  from './biographies/wei/shaodiiji.js'
import zhangliao  from './biographies/wei/zhangliao.js'
import xuhuang    from './biographies/wei/xuhuang.js'
import guojia     from './biographies/wei/guojia.js'
import zhanglu    from './biographies/wei/zhanglu.js'
import dianwei    from './biographies/wei/dianwei.js'
import bianhuang  from './biographies/wei/bianhuang.js'
import zhenhuang  from './biographies/wei/zhenhuang.js'
import guowen     from './biographies/wei/guowen.js'
import maohuang   from './biographies/wei/maohuang.js'
import guoyuan    from './biographies/wei/guoyuan.js'
import dongzhuo   from './biographies/wei/dongzhuo.js'
import yuanshao   from './biographies/wei/yuanshao.js'
import yuanshu    from './biographies/wei/yuanshu.js'
import liubiao    from './biographies/wei/liubiao.js'
import lvbu       from './biographies/wei/lvbu.js'
import zhangmiao  from './biographies/wei/zhangmiao.js'
import zanghong   from './biographies/wei/zanghong.js'
import gongsunzan from './biographies/wei/gongsunzan.js'
import taoquian   from './biographies/wei/taoquian.js'
import zhangyang  from './biographies/wei/zhangyang.js'
import gongsundu  from './biographies/wei/gongsundu.js'
import zhangyan   from './biographies/wei/zhangyan.js'
import zhangxiu   from './biographies/wei/zhangxiu.js'
import xiahoudun  from './biographies/wei/xiahoudun.js'
import xiahouyuan from './biographies/wei/xiahouyuan.js'
import caoren     from './biographies/wei/caoren.js'
import caohong    from './biographies/wei/caohong.js'
import caoxiu     from './biographies/wei/caoxiu.js'
import caozhen    from './biographies/wei/caozhen.js'
import xiahoushang from './biographies/wei/xiahoushang.js'
import xunyu      from './biographies/wei/xunyu.js'
import xunyou     from './biographies/wei/xunyou.js'
import jiaxu      from './biographies/wei/jiaxu.js'
import yuanhuan   from './biographies/wei/yuanhuan.js'
import zhangfan   from './biographies/wei/zhangfan.js'
import liangmao   from './biographies/wei/liangmao.js'
import guoyuan11  from './biographies/wei/guoyuan11.js'
import tianchou   from './biographies/wei/tianchou.js'
import wangxiu    from './biographies/wei/wangxiu.js'
import bingyuan   from './biographies/wei/bingyuan.js'
import guanning   from './biographies/wei/guanning.js'
import zhangjian  from './biographies/wei/zhangjian.js'
import huzhao     from './biographies/wei/huzhao.js'
import cuiyan     from './biographies/wei/cuiyan.js'
import maojie     from './biographies/wei/maojie.js'
import xuyi       from './biographies/wei/xuyi.js'
import hekui      from './biographies/wei/hekui.js'
import xingyong   from './biographies/wei/xingyong.js'
import baoxun     from './biographies/wei/baoxun.js'
import simazhi    from './biographies/wei/simazhi.js'
import zhongyao   from './biographies/wei/zhongyao.js'
import zhongyu    from './biographies/wei/zhongyu.js'
import huaxin     from './biographies/wei/huaxin.js'
import wanglang   from './biographies/wei/wanglang.js'
import wangsu     from './biographies/wei/wangsu.js'
import chengyu    from './biographies/wei/chengyu.js'
import dongzhao   from './biographies/wei/dongzhao.js'
import liuye      from './biographies/wei/liuye.js'
import jiangji    from './biographies/wei/jiangji.js'
import liufang    from './biographies/wei/liufang.js'
import sunzi      from './biographies/wei/sunzi.js'
import liufu      from './biographies/wei/liufu.js'
import simalang   from './biographies/wei/simalang.js'
import liangxi    from './biographies/wei/liangxi.js'
import zhangi     from './biographies/wei/zhangi.js'
import wenhui     from './biographies/wei/wenhui.js'
import jiakui     from './biographies/wei/jiakui.js'
import renjun     from './biographies/wei/renjun.js'
import suze       from './biographies/wei/suze.js'
import duji       from './biographies/wei/duji.js'
import dushu      from './biographies/wei/dushu.js'
import zhenghun   from './biographies/wei/zhenghun.js'
import cangci     from './biographies/wei/cangci.js'
import yuejin     from './biographies/wei/yuejin.js'
import yujin      from './biographies/wei/yujin.js'
import zhanghe    from './biographies/wei/zhanghe.js'
import zhuling    from './biographies/wei/zhuling.js'
import litdian    from './biographies/wei/litdian.js'
import litong     from './biographies/wei/litong.js'
import zangba     from './biographies/wei/zangba.js'
import wenping    from './biographies/wei/wenping.js'
import lvqian     from './biographies/wei/lvqian.js'
import xuchu      from './biographies/wei/xuchu.js'
import pangde     from './biographies/wei/pangde.js'
import pangyu     from './biographies/wei/pangyu.js'
import yanwen     from './biographies/wei/yanwen.js'
import caochang   from './biographies/wei/caochang.js'
import caozhi     from './biographies/wei/caozhi.js'
import caoxiong   from './biographies/wei/caoxiong.js'
import caoang     from './biographies/wei/caoang.js'
import caoshuo    from './biographies/wei/caoshuo.js'
import caochong   from './biographies/wei/caochong.js'
import caoju      from './biographies/wei/caoju.js'
import caoyu      from './biographies/wei/caoyu.js'
import caolin     from './biographies/wei/caolin.js'
import caogun     from './biographies/wei/caogun.js'
import caoxuan    from './biographies/wei/caoxuan.js'
import caojun     from './biographies/wei/caojun.js'
import caojv      from './biographies/wei/caojv.js'
import caogan     from './biographies/wei/caogan.js'
import caoshang   from './biographies/wei/caoshang.js'
import caobiao    from './biographies/wei/caobiao.js'
import caoqin     from './biographies/wei/caoqin.js'
import caocheng   from './biographies/wei/caocheng.js'
import caozheng   from './biographies/wei/caozheng.js'
import caojing    from './biographies/wei/caojing.js'
import caojun2    from './biographies/wei/caojun2.js'
import caoji      from './biographies/wei/caoji.js'
import caohui     from './biographies/wei/caohui.js'
import caomao     from './biographies/wei/caomao.js'
import caoxie     from './biographies/wei/caoxie.js'
import caorui2    from './biographies/wei/caorui2.js'
import caojian    from './biographies/wei/caojian.js'
import caolin2    from './biographies/wei/caolin2.js'
import caoli      from './biographies/wei/caoli.js'
import caoyong    from './biographies/wei/caoyong.js'
import caogong    from './biographies/wei/caogong.js'
import caoyan     from './biographies/wei/caoyan.js'
import wangcan    from './biographies/wei/wangcan.js'
import weiji      from './biographies/wei/weiji.js'
import huanjie    from './biographies/wei/huanjie.js'
import chenqun    from './biographies/wei/chenqun.js'
import chentai    from './biographies/wei/chentai.js'
import chenjiao   from './biographies/wei/chenjiao.js'
import xuxuan     from './biographies/wei/xuxuan.js'
import weizhen    from './biographies/wei/weizhen.js'
import luyu       from './biographies/wei/luyu.js'
import liuyi      from './biographies/wei/liuyi.js'
import liushao    from './biographies/wei/liushao.js'
import fugu       from './biographies/wei/fugu.js'
import heqia      from './biographies/wei/heqia.js'
import changlin   from './biographies/wei/changlin.js'
import yangjun    from './biographies/wei/yangjun.js'
import duxi       from './biographies/wei/duxi.js'
import zhaoyan    from './biographies/wei/zhaoyan.js'
import peiqian    from './biographies/wei/peiqian.js'
import hanjia     from './biographies/wei/hanjia.js'
import cuilin     from './biographies/wei/cuilin.js'
import gaoliu     from './biographies/wei/gaoliu.js'
import sunli      from './biographies/wei/sunli.js'
import wangguan   from './biographies/wei/wangguan.js'
import xinpi      from './biographies/wei/xinpi.js'
import yangfu     from './biographies/wei/yangfu.js'
import gaotanglong from './biographies/wei/gaotanglong.js'
import zhanqian   from './biographies/wei/zhanqian.js'
import manchong   from './biographies/wei/manchong.js'
import tianyu     from './biographies/wei/tianyu.js'
import qianzhao   from './biographies/wei/qianzhao.js'
import guohuai    from './biographies/wei/guohuai.js'
import xumiao     from './biographies/wei/xumiao.js'
import huzhi      from './biographies/wei/huzhi.js'
import wangchang  from './biographies/wei/wangchang.js'
import wangji     from './biographies/wei/wangji.js'
import wanglin    from './biographies/wei/wanglin.js'
import guanqiujian from './biographies/wei/guanqiujian.js'
import zhugetan   from './biographies/wei/zhugetan.js'
import dengai     from './biographies/wei/dengai.js'
import zhonghui   from './biographies/wei/zhonghui.js'
import huatuo     from './biographies/wei/huatuo.js'
import dukui      from './biographies/wei/dukui.js'
import zhujianping from './biographies/wei/zhujianping.js'
import zhouxuan   from './biographies/wei/zhouxuan.js'
import guanlu     from './biographies/wei/guanlu.js'
import wuhuanxianbeidongyi from './biographies/wei/wuhuanxianbeidongyi.js'

// ── 蜀书 ──────────────────────────────────────────────────
import liuyan          from './biographies/shu/liuyan.js'
import liuzhang        from './biographies/shu/liuzhang.js'
import liubei          from './biographies/shu/liubei.js'
import liushan         from './biographies/shu/liushan.js'
import ganhuanghou     from './biographies/shu/ganhuanghou.js'
import muhuanghou      from './biographies/shu/muhuanghou.js'
import jingaihuanghou  from './biographies/shu/jingaihuanghou.js'
import zhanghuanghou   from './biographies/shu/zhanghuanghou.js'
import liuyong         from './biographies/shu/liuyong.js'
import liuli           from './biographies/shu/liuli.js'
import liuxuan         from './biographies/shu/liuxuan.js'
import guanyu     from './biographies/shu/guanyu.js'
import zhangfei   from './biographies/shu/zhangfei.js'
import zhaoyun    from './biographies/shu/zhaoyun.js'
import machao     from './biographies/shu/machao.js'
import zhugeliang from './biographies/shu/zhugeliang.js'
import huangzhong from './biographies/shu/huangzhong.js'
import pangtong   from './biographies/shu/pangtong.js'
import fazheng    from './biographies/shu/fazheng.js'
import xujing     from './biographies/shu/xujing.js'
import mizhu      from './biographies/shu/mizhu.js'
import sunqian    from './biographies/shu/sunqian.js'
import jianyong   from './biographies/shu/jianyong.js'
import yiji       from './biographies/shu/yiji.js'
import qinmi      from './biographies/shu/qinmi.js'
import donghe     from './biographies/shu/donghe.js'
import liuba      from './biographies/shu/liuba.js'
import maliang    from './biographies/shu/maliang.js'
import masu       from './biographies/shu/masu.js'
import chenzhen   from './biographies/shu/chenzhen.js'
import dongyin    from './biographies/shu/dongyin.js'
import chenzhi    from './biographies/shu/chenzhi.js'
import lvyi       from './biographies/shu/lvyi.js'
import liufeng    from './biographies/shu/liufeng.js'
import pengyang   from './biographies/shu/pengyang.js'
import liaoli     from './biographies/shu/liaoli.js'
import liyan      from './biographies/shu/liyan.js'
import liuyan2    from './biographies/shu/liuyan2.js'
import weiyan     from './biographies/shu/weiyan.js'
import yangyi     from './biographies/shu/yangyi.js'
import huojun     from './biographies/shu/huojun.js'
import wanglian   from './biographies/shu/wanglian.js'
import xianglang  from './biographies/shu/xianglang.js'
import zhangyi    from './biographies/shu/zhangyi.js'
import yanghong   from './biographies/shu/yanghong.js'
import feishi     from './biographies/shu/feishi.js'
import duwei      from './biographies/shu/duwei.js'
import wuliang    from './biographies/shu/wuliang.js'
import zhouqun    from './biographies/shu/zhouqun.js'
import duqiong    from './biographies/shu/duqiong.js'
import xuci       from './biographies/shu/xuci.js'
import mengguang  from './biographies/shu/mengguang.js'
import laimin     from './biographies/shu/laimin.js'
import yinmo      from './biographies/shu/yinmo.js'
import lizuan     from './biographies/shu/lizuan.js'
import qiaozhou   from './biographies/shu/qiaozhou.js'
import quezheng   from './biographies/shu/quezheng.js'
import huangquan  from './biographies/shu/huangquan.js'
import lihui      from './biographies/shu/lihui.js'
import lvkai      from './biographies/shu/lvkai.js'
import mazhong    from './biographies/shu/mazhong.js'
import wangping   from './biographies/shu/wangping.js'
import zhangyi2   from './biographies/shu/zhangyi2.js'
import jiangwan   from './biographies/shu/jiangwan.js'
import feiyi      from './biographies/shu/feiyi.js'
import jiangwei   from './biographies/shu/jiangwei.js'
import dengzhangzongyangzhuan from './biographies/shu/dengzhangzongyangzhuan.js'

// ── 吴书 ──────────────────────────────────────────────────
import sunquan    from './biographies/wu/sunquan.js'
import sunliang   from './biographies/wu/sunliang.js'
import zhouyu     from './biographies/wu/zhouyu.js'
import lusu       from './biographies/wu/lusu.js'
import lvmeng     from './biographies/wu/lvmeng.js'
import tengyin    from './biographies/wu/tengyin.js'
import liudun     from './biographies/wu/liudun.js'

export const biographyData = {
  wei: {
    title: '魏书',
    biographies: [
      {
        id: 'wei-1',
        title: '武帝纪第一',
        persons: [caocao]
      },
      {
        id: 'wei-2',
        title: '文帝纪第二',
        persons: [caopi]
      },
      {
        id: 'wei-3',
        title: '明帝纪第三',
        persons: [caorui]
      },
      {
        id: 'wei-4',
        title: '少帝纪第四',
        persons: [shaodiiji]
      },
      {
        id: 'wei-5',
        title: '后妃传第五',
        persons: [bianhuang, zhenhuang, guowen, maohuang, guoyuan]
      },
      {
        id: 'wei-6',
        title: '董二袁刘传第六',
        persons: [dongzhuo, yuanshao, yuanshu, liubiao]
      },
      {
        id: 'wei-7',
        title: '吕布张邈臧洪传第七',
        persons: [lvbu, zhangmiao, zanghong]
      },
      {
        id: 'wei-8',
        title: '二公孙陶四张传第八',
        persons: [gongsunzan, taoquian, zhangyang, gongsundu, zhangyan, zhangxiu, zhanglu]
      },
      {
        id: 'wei-9',
        title: '诸夏侯曹传第九',
        persons: [xiahoudun, xiahouyuan, caoren, caohong, caoxiu, caozhen, xiahoushang]
      },
      {
        id: 'wei-10',
        title: '荀彧荀攸贾诩传第十',
        persons: [xunyu, xunyou, jiaxu]
      },
      {
        id: 'wei-11',
        title: '袁张凉国田王邴管传第十一',
        persons: [yuanhuan, zhangfan, liangmao, guoyuan11, tianchou, wangxiu, bingyuan, guanning, zhangjian, huzhao]
      },
      {
        id: 'wei-12',
        title: '崔毛徐何邢鲍司马传第十二',
        persons: [cuiyan, maojie, xuyi, hekui, xingyong, baoxun, simazhi]
      },
      {
        id: 'wei-13',
        title: '钟繇华歆王朗传第十三',
        persons: [zhongyao, zhongyu, huaxin, wanglang, wangsu]
      },
      {
        id: 'wei-14',
        title: '程郭董刘蒋刘传第十四',
        persons: [chengyu, guojia, dongzhao, liuye, jiangji, liufang, sunzi]
      },
      {
        id: 'wei-15',
        title: '刘司马梁张温贾传第十五',
        persons: [liufu, simalang, liangxi, zhangi, wenhui, jiakui]
      },
      {
        id: 'wei-16',
        title: '任苏杜郑仓传第十六',
        persons: [renjun, suze, duji, dushu, zhenghun, cangci]
      },
      {
        id: 'wei-17',
        title: '张乐于张徐传第十七',
        persons: [zhangliao, yuejin, yujin, zhanghe, xuhuang, zhuling]
      },
      {
        id: 'wei-18',
        title: '二李臧文吕许典二庞阎传第十八',
        persons: [litdian, litong, zangba, wenping, lvqian, xuchu, dianwei, pangde, pangyu, yanwen]
      },
      {
        id: 'wei-19',
        title: '任城陈萧王传第十九',
        persons: [caochang, caozhi, caoxiong]
      },
      {
        id: 'wei-20',
        title: '武文世王公传第二十',
        persons: [
          caoang, caoshuo, caochong, caoju, caoyu, caolin, caogun,
          caoxuan, caojun, caojv, caogan, caoshang, caobiao, caoqin,
          caocheng, caozheng, caojing, caojun2, caoji, caohui, caomao,
          caoxie, caorui2, caojian, caolin2, caoli, caoyong, caogong, caoyan
        ]
      },
      {
        id: 'wei-21',
        title: '王卫二刘傅传第二十一',
        persons: [wangcan, weiji, liuyi, liushao, fugu]
      },
      {
        id: 'wei-22',
        title: '桓二陈徐卫卢传第二十二',
        persons: [huanjie, chenqun, chentai, chenjiao, xuxuan, weizhen, luyu]
      },
      {
        id: 'wei-23',
        title: '和常杨杜赵裴传第二十三',
        persons: [heqia, changlin, yangjun, duxi, zhaoyan, peiqian]
      },
      {
        id: 'wei-24',
        title: '韩崔高孙王传第二十四',
        persons: [hanjia, cuilin, gaoliu, sunli, wangguan]
      },
      {
        id: 'wei-25',
        title: '辛毗杨阜高堂隆传第二十五',
        persons: [xinpi, yangfu, gaotanglong, zhanqian]
      },
      {
        id: 'wei-26',
        title: '满田牵郭传第二十六',
        persons: [manchong, tianyu, qianzhao, guohuai]
      },
      {
        id: 'wei-27',
        title: '徐胡二王传第二十七',
        persons: [xumiao, huzhi, wangchang, wangji]
      },
      {
        id: 'wei-28',
        title: '王毋丘诸葛邓钟传第二十八',
        persons: [wanglin, guanqiujian, zhugetan, dengai, zhonghui]
      },
      {
        id: 'wei-29',
        title: '方技传第二十九',
        persons: [huatuo, dukui, zhujianping, zhouxuan, guanlu]
      },
      {
        id: 'wei-30',
        title: '乌丸鲜卑东夷传第三十',
        persons: [wuhuanxianbeidongyi]
      },
    ]
  },
  shu: {
    title: '蜀书',
    biographies: [
      {
        id: 'shu-1',
        title: '刘二牧传第一',
        persons: [liuyan, liuzhang]
      },
      {
        id: 'shu-2',
        title: '先主传第二',
        persons: [liubei]
      },
      {
        id: 'shu-3',
        title: '后主传第三',
        persons: [liushan]
      },
      {
        id: 'shu-4',
        title: '二主妃子传第四',
        persons: [ganhuanghou, muhuanghou, jingaihuanghou, zhanghuanghou, liuyong, liuli, liuxuan]
      },
      {
        id: 'shu-5',
        title: '诸葛亮传第五',
        persons: [zhugeliang]
      },
      {
        id: 'shu-6',
        title: '关张马黄赵传第六',
        persons: [guanyu, zhangfei, machao, huangzhong, zhaoyun]
      },
      {
        id: 'shu-7',
        title: '庞统法正传第七',
        persons: [pangtong, fazheng]
      },
      {
        id: 'shu-8',
        title: '许麋孙简伊秦传第八',
        persons: [xujing, mizhu, sunqian, jianyong, yiji, qinmi]
      },
      {
        id: 'shu-9',
        title: '董刘马陈董吕传第九',
        persons: [donghe, liuba, maliang, masu, chenzhen, dongyin, chenzhi, lvyi]
      },
      {
        id: 'shu-10',
        title: '刘彭廖李刘魏杨传第十',
        persons: [liufeng, pengyang, liaoli, liyan, liuyan2, weiyan, yangyi]
      },
      {
        id: 'shu-11',
        title: '霍王向张杨费传第十一',
        persons: [huojun, wanglian, xianglang, zhangyi, yanghong, feishi]
      },
      {
        id: 'shu-12',
        title: '杜周杜许孟来尹李谯郤传第十二',
        persons: [duwei, wuliang, zhouqun, duqiong, xuci, mengguang, laimin, yinmo, lizuan, qiaozhou, quezheng]
      },
      {
        id: 'shu-13',
        title: '黄李吕马王张传第十三',
        persons: [huangquan, lihui, lvkai, mazhong, wangping, zhangyi2]
      },
      {
        id: 'shu-14',
        title: '蒋琬费祎姜维传第十四',
        persons: [jiangwan, feiyi, jiangwei]
      },
      {
        id: 'shu-15',
        title: '邓张宗杨传第十五',
        persons: [dengzhangzongyangzhuan]
      }
    ]
  },
  wu: {
    title: '吴书',
    biographies: [
      // {
      //   id: 'wu-1',
      //   title: '吴主传第二',
      //   persons: [sunquan, sunliang]
      // },
      // {
      //   id: 'wu-2',
      //   title: '周瑜鲁肃吕蒙传第九',
      //   persons: [zhouyu, lusu, lvmeng]
      // },
      // {
      //   id: 'wu-3',
      //   title: '诸葛滕二孙濮阳传第十九',
      //   persons: [tengyin]
      // },
      {
        id: 'wu-4',
        title: '吴范刘惇赵达传第十八',
        persons: [liudun]
      }
    ]
  }
}
