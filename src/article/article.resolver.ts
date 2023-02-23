import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

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
}
