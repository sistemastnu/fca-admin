import Posts from "../Posts";
import Tags from "../Tags";

Posts.hasMany(Tags, { foreignKey: "idPost", onDelete: "CASCADE" });
Tags.belongsTo(Posts, { foreignKey: "idPost", onDelete: "CASCADE" });

export { Posts, Tags };
