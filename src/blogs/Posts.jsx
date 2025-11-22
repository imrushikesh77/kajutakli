// K8s
import K8sInBits from "./K8sInBits";
import k8sImg from "@/assets/blogs/k8s-in-bits.jpeg"

/**
 * Add a new blog:
 * 1) create src/posts/YourSlug.jsx exporting default React component
 * 2) import it here and add an entry to the array below
 *
 * Each entry is the metadata shown on the listing; `component` is the full post React component.
 */
export const posts = [
    {
        slug: "k8s-in-noobs-way",
        title: "K8s in noob's way",
        excerpt: "Archive of links and short notes for Kubernetes tutorials, patterns and tips.",
        tags: ["Kubernetes", "Development", "Backend"],
        publishedAt: "2025-11-22",
        image: k8sImg,
        component: K8sInBits,
    }
];

export default posts;