import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { SwitchArticleInput } from './dto/switch-article.input';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ArticleOrBoolean {
  @Field(() => Article, { nullable: true })
  article?: Article;

  @Field(() => Boolean, { nullable: true })
  boolean?: boolean;
}
@Resolver()
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => ArticleOrBoolean)
  updateArticle(
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ) {
    const { id, quantity, expirationDate } = updateArticleInput;
    if (quantity === 0) {
      this.articleService.remove(id);
      return { boolean: true };
    } else {
      const article = this.articleService.updateArticle(
        id,
        quantity,
        expirationDate,
      );
      return { article };
    }
  }

  @Mutation(() => Article, { name: 'createArticle' })
  createArticle(
    @Args('createArticleInput')
    createArticleInput: CreateArticleInput,
  ) {
    return this.articleService.create(createArticleInput);
  }

  @Mutation(() => Article)
  switchArticleLocation(
    @Args('switchArticleInput') switchArticleInput: SwitchArticleInput,
  ) {
    const { id, quantity, idLocation } = switchArticleInput;
    return this.articleService.switchLocation(id, quantity, idLocation);
  }

  @Mutation(() => Boolean)
  deleteArticle(@Args('id') id: number) {
    this.articleService.remove(id);
    return true;
  }
}
