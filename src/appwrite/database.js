import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf";

export class DatabaseService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteURL)
      .setProject(conf.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //   getting the post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (err) {
      console.log("AppWrite service :: getPost() :: ", err);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabseId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (err) {
      console.log("AppWrite service :: getPost() :: ", err);
      return false;
    }
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          featuredImage,
          status,
          userId,
          content,
        }
      );
    } catch (err) {
      console.log("AppWrite service :: createPost() :: ", err);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabseId,
        conf.appWriteCollectionId,
        slug,
        { title, featuredImage, status, content }
      );
    } catch (err) {
      console.log("AppWrite service :: udpatePost() :: ", err);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appWriteDatabseId,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (err) {
      console.log("AppWrite service :: deletePost() :: ", err);
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (err) {
      console.log("AppWrite service :: uploadFile() :: ", err);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
    } catch (err) {
      console.log("AppWrite service :: deleteFile() :: ", err);
    }
  }

  previewFile(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appWriteBucketId, fileId).href;
    } catch (err) {
      console.log("AppWrite service :: previewFile() :: ", err);
    }
  }
}

const databaseService = new DatabaseService();

export default databaseService;
