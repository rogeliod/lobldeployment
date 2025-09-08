import BasicNode from "@/components/reusable/nodes/Basic";
import ClusterNode from "@/components/reusable/nodes/Cluster";
import DatabaseNode from "@/components/reusable/nodes/Database";
import DeploymentNode from "@/components/reusable/nodes/Deployment";
import PoolNode from "@/components/reusable/nodes/Pool";
import S3Node from "@/components/reusable/nodes/S3";

export const nodeTypes = {
  s3: S3Node,
  database: DatabaseNode,
  cluster: ClusterNode,
  pool: PoolNode,
  deployment: DeploymentNode,
  basicNode: BasicNode,
};
