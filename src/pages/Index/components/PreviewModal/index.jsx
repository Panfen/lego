import React from 'react';
import { Modal } from 'antd';
import { getComponent } from '../../../../utils';
import './index.scss';

export default ({ visible, data, onClose }) => {

	const renderDom = (json) => {
    return (
      json.map((d, i) => {
        if (d.hasDelete) return;
        var component;
        if (d.is_native) {
          component = d.type;
        } else {
          component = getComponent(d.type.split('.'));
        }

        var realProps = Object.assign({}, d.props);
        for (var i in realProps) {
          if (typeof (realProps[i]) == 'object' && realProps[i].type == 'relative') {
            realProps[i] = realProps[realProps[i].target] ? realProps[i].true : realProps[i].false;
          }
        }

        if (d.wrap_inner) {
          return React.createElement(
            component,
            realProps,
            [<div style={{ width: "100%", height: "100%", minHeight: 20, minWidth: 20 }}>
              {d.props.content ? [d.props.content] : (d.childrens ? renderDom(d.childrens) : null)}
            </div>]
          )
        } else if (d.wrap) {
          return <div {...props} style={{ width: "100%", height: "100%", minHeight: 20, minWidth: 20 }}>
            {React.createElement(
              component,
              realProps,
              d.props.content ? [d.props.content] : (d.childrens ? renderDom(d.childrens) : null)
            )}
          </div>
        } else {
          return React.createElement(
            component,
            realProps,
            d.props.content ? [d.props.content] : (d.childrens ? renderDom(d.childrens) : null)
          )
        }
      })
    )
  }

	return (
		<Modal
			title="页面预览"
			className="preview-modal"
			visible={visible}
      closable={false}
			onCancel={onClose}
      footer={null}
      width="50%"
		>
			{renderDom(data)}
		</Modal>
	)
}