import Posts from "../Posts";
import Tags from "../Tags";
import User from "../User";

User.hasMany(Posts, { foreignKey: "userId", onDelete: "CASCADE" });
Posts.belongsTo(User, { foreignKey: "userId" });
Posts.hasMany(Tags, { foreignKey: "idPost", onDelete: "CASCADE" });
Tags.belongsTo(Posts, { foreignKey: "idPost", onDelete: "CASCADE" });

export { Posts, Tags, User };
