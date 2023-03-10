import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { CreateArticleInput } from './dto/create-article.input';

@Resolver()
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => Article)
  updateArticle(@Args('id') id: number, quantity?: number) {
    if (quantity === 0) {
      this.articleService.remove(id);
    } else {
      return this.articleService.updateQuantity(id, quantity);
    }
  }

  @Mutation(() => Article, { name: 'createArticle' })
  createArticle(
    @Args('createArticleInput')
    createArticleInput: CreateArticleInput,
  ) {
    return this.articleService.create(createArticleInput);
  }
}
