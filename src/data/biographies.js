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
        id: 'wei-5',
        title: '少帝纪第四',
        persons: [shaodiiji]
      },
      {
        id: 'wei-6',
        title: '后妃传第五',
        persons: [bianhuang, zhenhuang, guowen, maohuang, guoyuan]
      },
      // {
      //   id: 'wei-2',
      //   title: '张辽传第十七',
      //   persons: [zhangliao, xuhuang]
      // },
      // {
      //   id: 'wei-3',
      //   title: '程郭董刘蒋刘传第十四',
      //   persons: [guojia]
      // },
      {
        id: 'wei-7',
        title: '董二袁刘传第六',
        persons: [dongzhuo, yuanshao, yuanshu, liubiao]
      },
      {
        id: 'wei-8',
        title: '吕布张邈臧洪传第七',
        persons: [lvbu, zhangmiao, zanghong]
      },
      {
        id: 'wei-4',
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
      // {
      //   id: 'wei-5',
      //   title: '二李臧文吕许典二庞阎传第十八',
      //   persons: [dianwei]
      // }
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
