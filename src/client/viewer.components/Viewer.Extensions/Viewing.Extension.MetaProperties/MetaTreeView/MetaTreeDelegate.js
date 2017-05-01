import { TreeDelegate } from 'TreeView'
import MetaTreeNode from './MetaTreeNode'

///////////////////////////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////////////////////////
export default class MetaTreeDelegate extends TreeDelegate {

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  constructor () {

    super ()
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  setProperties (properties) {

    this.mapByCategory(properties)
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  createRootNode (data) {

    this.rootNode = new MetaTreeNode({

      propsMap: this.propsMap,
      name: data.name,
      delegate: this,
      group: true,
      parent: null,
      type: 'root',
      id: 'root'
    })

    return this.rootNode
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  destroy () {

    this.rootNode.destroy()
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  createTreeNode (node, parentDomElement) {

    const container = document.createElement('div')

    parentDomElement.appendChild(container)

    node.type.split('.').forEach((cls) => {

      parentDomElement.classList.add(cls)
    })

    node.mount(container)
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  nodeClickSelector (event) {

    const selector = ['HEADER', 'LABEL']

    return (selector.indexOf(event.target.nodeName) > -1)
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  forEachChild (node, addChild) {

    node.addChild = addChild
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  mapByCategory (properties) {

    this.propsMap = {}

    properties.forEach((prop) => {

      const category = !!prop.displayCategory
        ? prop.displayCategory
        : 'Other'

      if (category.indexOf('__') !== 0) {

        this.propsMap[category] =
          this.propsMap[category] || []

        this.propsMap[category].push(prop)
      }
    })
  }
}