import { Component, OnInit, signal, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-hero",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./hero.component.html",
  styleUrl: "./hero.component.css",
})
export class HeroComponent implements OnInit, AfterViewInit {
  displayedText = signal("");
  roles = ["Full Stack Developer", "Java Developer", "Angular Expert", "Software Engineer"];
  currentRoleIndex = signal(0);
  isVisible = signal(false);

  ngOnInit() {
    setTimeout(() => this.startTypingAnimation());
  }

  ngAfterViewInit() {
    // Trigger reveal animation
    setTimeout(() => {
      this.isVisible.set(true);
    }, 100);
  }

  startTypingAnimation() {
    const role = this.roles[this.currentRoleIndex()];
    let index = 0;

    const type = () => {
      if (index <= role.length) {
        this.displayedText.set(role.substring(0, index));
        index++;
        setTimeout(type, 100);
      } else {
        setTimeout(() => eraseText(), 2000);
      }
    };

    const eraseText = () => {
      if (this.displayedText().length > 0) {
        this.displayedText.set(this.displayedText().slice(0, -1));
        setTimeout(eraseText, 50);
      } else {
        this.currentRoleIndex.set(
          (this.currentRoleIndex() + 1) % this.roles.length,
        );
        setTimeout(() => this.startTypingAnimation(), 500);
      }
    };

    type();
  }
}
