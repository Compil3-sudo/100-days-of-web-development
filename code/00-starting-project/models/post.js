const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const db = require("../data/database");

class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;

    // id is optional
    if (id) {
      this.id = new ObjectId(id);
    }
  }

  static async fetchAll() {
    const posts = await db.getDb().collection("posts").find().toArray();
    return posts;
  }

  async fetch() {
    if (!this.id) return;

    const postDocument = await db
      .getDb()
      .collection("posts")
      .findOne({ _id: this.id });

    this.title = postDocument.title;
    this.content = postDocument.content;
  }

  async save() {
    let result;

    // if id => update existing post
    if (this.id) {
      result = await db
        .getDb()
        .collection("posts")
        .updateOne(
          { _id: this.id },
          { $set: { title: this.title, content: this.content } }
        );
    } else {
      // create new post
      const newPost = {
        title: this.title,
        content: this.content,
      };

      result = await db.getDb().collection("posts").insertOne(newPost);
    }
    return result;
  }

  async delete() {
    if (!this.id) {
      // or throw some error
      return;
    }
    const result = await db
      .getDb()
      .collection("posts")
      .deleteOne({ _id: this.id });

    return result;
  }
}

module.exports = Post;
