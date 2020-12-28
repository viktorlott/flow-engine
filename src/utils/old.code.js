// const [{ isOver, pos }, drop] = useDrop({
  //   accept: "Block",

  //   drop(props, monitor) {
  //     const offset = monitor.getSourceClientOffset();
  //     if (offset && processRef.current) {
  //       const dropTargetXy = processRef.current.getBoundingClientRect();

  //       const pos = {
  //         x: offset.x - dropTargetXy.left,
  //         y: offset.y - dropTargetXy.top,
  //       }

  //       const node1 = new CustomNodeModel({
  //         name: props.extra.title,
  //         color: props.extra.theme,
  //         icon: props.extra.icon,
  //         ports: props.extra.ports,
  //         extra: props.extra.extra,
  //         toggleEditor

  //       })

  //       model.addAll(node1)

  //       node1.setPosition(pos.x, pos.y)



  //     }


  //   },
  //   collect: monitor => ({
  //     isOver: !!monitor.isOver(),
  //     pos: monitor.getClientOffset()
  //   }),
  // })
