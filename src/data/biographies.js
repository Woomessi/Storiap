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

// ── 蜀书 ──────────────────────────────────────────────────
import liubei     from './biographies/shu/liubei.js'
import liushan    from './biographies/shu/liushan.js'
import guanyu     from './biographies/shu/guanyu.js'
import zhangfei   from './biographies/shu/zhangfei.js'
import zhaoyun    from './biographies/shu/zhaoyun.js'
import machao     from './biographies/shu/machao.js'
import huangzhong from './biographies/shu/huangzhong.js'

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
    ]
  },
  shu: {
    title: '蜀书',
    biographies: [
      // {
      //   id: 'shu-1',
      //   title: '先主传第二',
      //   persons: [liubei, liushan]
      // },
      {
        id: 'shu-2',
        title: '关张马黄赵传第六',
        persons: [huangzhong]
      }
      // {
      //   id: 'shu-2',
      //   title: '关张马黄赵传第六',
      //   persons: [guanyu, zhangfei, zhaoyun, machao, huangzhong]
      // }
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
