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
import zhangliao  from './biographies/wei/zhangliao.js'
import xuhuang    from './biographies/wei/xuhuang.js'
import guojia     from './biographies/wei/guojia.js'
import zhanglu    from './biographies/wei/zhanglu.js'
import dianwei    from './biographies/wei/dianwei.js'

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
        id: 'wei-4',
        title: '二公孙陶四张传第八',
        persons: [zhanglu]
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
