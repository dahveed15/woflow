const getAllIDs = async (nodeIDArray) => {
  const allNodeIDs = [];

  const nodeListData = async (nodeIDArray) => {
    const res = await fetch(
      `https://nodes-on-nodes-challenge.herokuapp.com/nodes/${nodeIDArray.join(
        ","
      )}`
    );
    const data = await res.json();

    for (const node of data) {
      allNodeIDs.push(node.id);

      if (node.child_node_ids.length > 0) {
        allNodeIDs.push(...(await getAllIDs(node.child_node_ids)));
      }
    }
  };

  await nodeListData(nodeIDArray);

  return allNodeIDs;
};

const getAnswers = async () => {
  const nodeIDs = await getAllIDs(["089ef556-dfff-4ff2-9733-654645be56fe"]);

  //1. What is the total number of unique node IDs?
  const uniqueIDs = [...new Set(nodeIDs)];

  //30 ids
  console.log('total number of unique ids', uniqueIDs.length)

  //2. What is the most common node ID?
  let duplicates = {};
  let highestCount = 1;
  let mostCommonNodeId = null;
  

  nodeIDs.forEach((nodeId) => {
    if(!duplicates[nodeId]) {
      duplicates[nodeId] = 1;
    } else {
      duplicates[nodeId]++;
    }

    if (duplicates[nodeId] > highestCount) {
      highestCount = duplicates[nodeId];
      mostCommonNodeId = nodeId;
    }
  });


  //"a06c90bf-e635-4812-992e-f7b1e2408a3f"
  console.log('most Common Node Id', mostCommonNodeId);
  console.log('frequency', highestCount);

};

getAnswers();
