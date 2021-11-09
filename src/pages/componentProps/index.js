import Layout from '../coms/Layout';
import Layout_Header from '../coms/Layout.Header';
import Layout_Sider from '../coms/Layout.Sider';
import Layout_Content from '../coms/Layout.Content';
import Breadcrumb from '../coms/Breadcrumb';
import Form from '../coms/Form';
import Form_Item from '../coms/Form.Item';
import Form_Item_Inline from '../coms/Form.Item.Inline';
import Form_Item_Submit from '../coms/Form.Item.Submit';
import Button from '../coms/Button';
import Input from '../coms/Input';
import DatePicker from '../coms/DatePicker';
import Radio_Group from '../coms/Radio.Group';
import Badge from '../coms/Badge';
import Calendar from '../coms/Calendar';
import Tag from '../coms/Tag';
import Table from '../coms/Table';
import Table_Data from '../coms/Table_Data';
import InputNumber from '../coms/InputNumber';
import Switch from '../coms/Switch';
import Table_Column from '../coms/Table.Column';
import Modal from '../coms/Modal';
import div from '../coms/div';

import RJImageUploader from '../coms/RJImgUploader';
import RJMenu from '../coms/RJMenu';
import RJPagination from '../coms/RJPagination';
import RJSelect from '../coms/RJSelect';

var _ = require('lodash');

export default {
  Button : [
    {
      label: '标题',
      type: 'input',
      default: '按钮',
    },
    {
      label: '字段名',
      type: 'input',
      default: 'field'
    },
    {
      label: '栅格',
      type: 'slider',
      min: 1,
      default: 12,
      max: 24,
    },
    {
      label: '标签宽度',
      type: 'inputNumber',
      default: '',
    },
    {
      label: '按钮类型',
      type: 'select',
      options: [
        'primary',
        'normal',
        'error',
      ],
      default: 'primary',
    },
    {
      label: '按钮文字',
      type: 'select',
      options: [
        'primary',
        'normal',
        'error',
      ],
      default: 'primary',
    },
    {
      label: '显示标签',
      type: 'switch',
      default: false,
    },
    {
      label: '是否禁用',
      type: 'switch',
      default: false,
    }
  ]
}
